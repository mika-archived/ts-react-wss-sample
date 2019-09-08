import "@testing-library/jest-dom/extend-expect";
import "jest-styled-components";

import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import EnterRoom from "./EnterRoom";

afterEach(cleanup);

test("does not have changes between snapshots", () => {
  const { asFragment } = render(<EnterRoom onSubmit={() => {}} />);

  expect(asFragment()).toMatchSnapshot();
});

test("fire `onSubmit` event with inputs when enter the RoomID and click the button", () => {
  const callback = jest.fn();
  const { getByRole } = render(<EnterRoom onSubmit={callback} />);

  fireEvent.change(getByRole("textbox"), { target: { value: "test" } });
  fireEvent.click(getByRole("button"));

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith("test");
});

test("if RoomID is empty, can not click (fire) the submit button", () => {
  const callback = jest.fn();
  const { getByRole } = render(<EnterRoom onSubmit={callback} />);

  fireEvent.click(getByRole("button"));

  expect(callback).toHaveBeenCalledTimes(0);
});
