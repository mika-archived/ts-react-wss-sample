import "@testing-library/jest-dom/extend-expect";
import "jest-styled-components";

import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import EnterRoom from "./EnterRoom";

afterEach(cleanup);

test("does not have changes between snapshot", () => {
  const { asFragment } = render(<EnterRoom onSubmit={() => {}} />);

  expect(asFragment()).toMatchSnapshot();
});

test("fire `onSubmit` when Username and RoomID are entered and the button is clicked", () => {
  const callback = jest.fn();
  const { getAllByRole, getByRole } = render(<EnterRoom onSubmit={callback} />);

  fireEvent.change(getAllByRole("textbox")[0], { target: { value: "username" } });
  fireEvent.change(getAllByRole("textbox")[1], { target: { value: "room_id" } });
  fireEvent.click(getByRole("button"));

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith("room_id", "username");
});

test("if Username is empty, can not click (fire) the submit button", () => {
  const callback = jest.fn();
  const { getAllByRole, getByRole } = render(<EnterRoom onSubmit={callback} />); // RoomID is empty and Username is filled by default

  fireEvent.change(getAllByRole("textbox")[0], { target: { value: "" } });
  fireEvent.change(getAllByRole("textbox")[1], { target: { value: "room_id" } });
  fireEvent.click(getByRole("button"));

  expect(callback).toHaveBeenCalledTimes(0);
});

test("if RoomID is empty, can not click (fire) the submit button", () => {
  const callback = jest.fn();
  const { getByRole } = render(<EnterRoom onSubmit={callback} />); // RoomID is empty and Username is filled by default

  fireEvent.click(getByRole("button"));

  expect(callback).toHaveBeenCalledTimes(0);
});
