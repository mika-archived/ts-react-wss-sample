import { act, renderHook } from "@testing-library/react-hooks";

import useChat from "./useChat";
import useSocket from "./useSocket";

type UseChatProps = {
  uri: string;
  callbacks: {
    onConnect?: () => void;
    onDisconnect?: () => void;
  };
};

test("useChat", () => {
  const onConnect = jest.fn();
  const onDisconnect = jest.fn();
  const hook = renderHook(({ uri, callbacks }: UseChatProps) => useChat(uri, callbacks), {
    initialProps: {
      uri: "http://example.com",
      callbacks: {
        onConnect: () => onConnect(),
        onDisconnect: () => onDisconnect()
      }
    }
  });

  expect(onConnect).toHaveBeenCalledTimes(1); // connect websocket on mounted phase

  jest
    .spyOn(console, "error")
    .mockImplementationOnce(w => w)
    .mockImplementationOnce(w => w)
    .mockImplementationOnce(w => w); // three times

  act(() => {
    hook.result.current.leave();
  });

  expect(console.error).toHaveBeenCalledTimes(1);

  act(() => {
    hook.result.current.sendMessage("Hello");
  });

  expect(console.error).toHaveBeenCalledTimes(2);

  act(() => {
    hook.result.current.join("test", "username");
  });

  expect(hook.result.current.roomId).toBe("test");
  expect(hook.result.current.messages).toStrictEqual([]);

  act(() => {
    hook.result.current.join("test2", "username");
  });

  expect(console.error).toHaveBeenCalledTimes(3);
  expect(hook.result.current.roomId).toBe("test"); // does not changes

  act(() => {
    hook.result.current.sendMessage("Hello, World");
  });

  expect(hook.result.current.messages.length).toBe(1);

  act(() => {
    hook.result.current.leave();
  });

  expect(hook.result.current.roomId).toBe(null);
  expect(hook.result.current.messages).toStrictEqual([]);
});
