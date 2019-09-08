import "@testing-library/jest-dom/extend-expect";
import "jest-styled-components";

import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import ChatInputBox from "./ChatInputBox";

afterEach(cleanup);

test("does not have changes between snapshots", () => {
  const { asFragment } = render(<ChatInputBox onSubmit={() => {}} />);

  expect(asFragment()).toMatchSnapshot();
});

test("fire `onSubmit` event with inputs and cleanup textbox when enter the message and click the button", () => {
  const callback = jest.fn();
  const { getByRole } = render(<ChatInputBox onSubmit={callback} />);

  fireEvent.change(getByRole("textbox"), { target: { value: "test" } });
  fireEvent.click(getByRole("button"));

  // fire event
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith("test");

  // cleanup textbox
  expect((getByRole("textbox") as HTMLInputElement).value).toBe("");
});

test("if message is empty, can not click (fire) the submit button", () => {
  const callback = jest.fn();
  const { getByRole } = render(<ChatInputBox onSubmit={callback} />);

  fireEvent.click(getByRole("button"));

  expect(callback).toHaveBeenCalledTimes(0);
});
