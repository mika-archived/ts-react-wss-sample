import "@testing-library/jest-dom/extend-expect";
import "jest-styled-components";

import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";

import ChatRoom from "./ChatRoom";
import { MessageResponse } from "../../type";

const messages = [
  {
    username: "HinataYui",
    timestamp: 1234567890,
    content: "Angel Beats!"
  } as MessageResponse
];

afterEach(cleanup);

test("does not have changes between snapshot", () => {
  const { asFragment } = render(
    <ChatRoom roomId="example" messages={messages} onSubmit={() => {}} onLeave={() => {}} />
  );

  expect(asFragment()).toMatchSnapshot();
});

test("showing RoomID on header", () => {
  const { getByText } = render(<ChatRoom roomId="example" messages={[]} onSubmit={() => {}} onLeave={() => {}} />);

  expect(getByText("Room ID: example")).not.toBeUndefined();
});

test("fire `onSubmit` event when user filled message and click button", () => {
  const onSubmit = jest.fn();
  const { getByRole, getByText } = render(
    <ChatRoom roomId="example" messages={[]} onSubmit={onSubmit} onLeave={() => {}} />
  );

  fireEvent.change(getByRole("textbox"), { target: { value: "Hello" } });
  fireEvent.click(getByText("Sent"));

  expect(onSubmit).toHaveBeenCalledTimes(1);
});

test("fire `onLeave` event when user clicked `leave` button", () => {
  const onLeave = jest.fn();
  const { getByText } = render(<ChatRoom roomId="example" messages={[]} onSubmit={() => {}} onLeave={onLeave} />);

  fireEvent.click(getByText("Leave Room"));

  expect(onLeave).toHaveBeenCalledTimes(1);
});

test("when provided message(s), show it", () => {
  const { getByText } = render(
    <ChatRoom roomId="example" messages={messages} onSubmit={() => {}} onLeave={() => {}} />
  );
  const component = getByText(/HinataYui.*: Angel Beats!/);
  expect(component).not.toBeUndefined();
});
