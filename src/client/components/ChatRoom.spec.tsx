import "@testing-library/jest-dom/extend-expect";
import "jest-styled-components";

import { act, cleanup, fireEvent, render, RenderResult } from "@testing-library/react";
import MockDate from "mockdate";
import React from "react";
import io from "socket.io-client";

import ChatRoom from "./ChatRoom";

function stealSocket(id: string = "example"): { component: RenderResult; socket: SocketIOClient.Socket } {
  // mock io.connect to steal an instance of socket.io-client, really????
  const connect = jest.spyOn(io, "connect");

  const component = render(<ChatRoom id={id} onLeave={() => {}} />);
  const socket = connect.mock.results[0].value as SocketIOClient.Socket;

  return { component, socket };
}

beforeEach(() => {
  MockDate.set(1568043532 * 1000);
});

afterEach(() => MockDate.reset());
afterEach(() => jest.restoreAllMocks());
afterEach(cleanup);

test("does not have changes between previous snapshots", () => {
  const { asFragment } = render(<ChatRoom id="example" onLeave={() => {}} />);

  expect(asFragment()).toMatchSnapshot();
});

test("showing RoomID on header", () => {
  const { getByText } = render(<ChatRoom id="example" onLeave={() => {}} />);

  expect(getByText("Room ID: example")).not.toBeUndefined();
});

test("connect to websocket on rendered, disconnect from it on unmounted", () => {
  const { component, socket } = stealSocket();

  expect(socket.connect).toHaveBeenCalledTimes(1);

  component.unmount();

  expect(socket.disconnect).toHaveBeenCalledTimes(1);
});

test("when message is received, show it (posted by Anonymous)", async () => {
  const { component, socket } = stealSocket();

  // emulate sent by another user
  act(() => {
    socket.emit("message", { content: "Hello", timestamp: 1568041419, user: "Anonymous" });
  });

  const message = await component.findByText(/Anonymous.*: Hello/);
  expect(message).not.toBeUndefined();
});

test("when message is sent, show it (posted by You)", async () => {
  const { findByText, getByRole, getByText } = render(<ChatRoom id="example" onLeave={() => {}} />);

  // emulate sent by myself
  fireEvent.change(getByRole("textbox"), { target: { value: "Hello, World" } });
  fireEvent.click(getByText("送信"));

  const component = await findByText(/You.*: Hello, World/);
  expect(component).not.toBeUndefined();
});

test("fire `onLeave` event when clicked `退室する` button", () => {
  const onLeaveCallback = jest.fn();

  const { getByText } = render(<ChatRoom id="example" onLeave={onLeaveCallback} />);
  fireEvent.click(getByText("退室する"));

  expect(onLeaveCallback).toHaveBeenCalledTimes(1);
});
