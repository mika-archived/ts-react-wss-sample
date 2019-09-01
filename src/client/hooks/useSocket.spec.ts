import { act, renderHook } from "@testing-library/react-hooks";

import useSocket from "./useSocket";

type Listeners = {
  [event: string]: (...args: any[]) => void;
};

it("useSocket", () => {
  const onConnect = jest.fn();
  const onDisconnect = jest.fn();
  const onMessage = jest.fn();
  const hook = renderHook(({ uri, listeners }: { uri: string; listeners: Listeners }) => useSocket(uri, listeners), {
    initialProps: {
      uri: "http://example.com",
      listeners: {
        connect: () => onConnect(),
        message: () => onMessage(),
        disconnect: () => onDisconnect()
      }
    }
  });
  let { socket } = hook.result.current;

  // disable autoConnect
  expect(socket.connected).toBeFalsy();

  // listener registered
  expect(socket.listeners("message").length).toBe(1);

  // rerender with same arguments
  jest.spyOn(socket, "removeListener");
  hook.rerender({
    uri: "http://example.com",
    listeners: {
      connect: () => onConnect(),
      message: () => onMessage(),
      disconnect: () => onDisconnect()
    }
  });

  // socket is not changed (when socket is changed, called disconnect event)
  expect(onDisconnect).toHaveBeenCalledTimes(0);

  // does not call removeListener
  expect(socket.removeListener).toHaveBeenCalledTimes(0);

  // listener is live!
  expect(socket.listeners("message").length).toBe(1);

  // rerender (uri is changed)
  // jest.spyOn(socket, "disconnect");
  // hook.rerender({
  //   uri: "https://example.com",
  //   listeners: {
  //     connect: () => onConnect(),
  //     message: () => onMessage(),
  //     disconnect: () => onDisconnect()
  //   }
  // });

  // re-create socket (equals to old socket is cleared)
  // expect(socket.disconnect).toHaveBeenCalledTimes(1);

  // socket = hook.result.current.socket;

  // rerender (listener is changed)
  hook.rerender({
    uri: "http://example.com",
    listeners: {
      connect: () => onConnect(),
      message: () => onMessage(),
      disconnect: () => onDisconnect(),
      joined: () => {}
    }
  });

  expect(socket.removeListener).toHaveBeenCalledTimes(3);
  expect(socket.listeners("joined").length).toBe(1);

  act(() => {
    socket.connect();
  });

  expect(socket.connected).toBeTruthy();
  expect(onConnect).toHaveBeenCalledTimes(1); // called connect event

  socket.emit("message", {});
  expect(onMessage).toHaveBeenCalledTimes(1); // called message event

  hook.unmount();

  expect(socket.connected).toBeFalsy();
  expect(onDisconnect).toHaveBeenCalledTimes(1); // called disconnect event
  expect(socket.listeners("message").length).toBe(0); // unsubscribed
});
