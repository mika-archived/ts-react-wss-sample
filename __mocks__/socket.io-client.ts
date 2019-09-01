import { EventEmitter } from "events";

// Mock for socket.io-client
const socket = jest.genMockFromModule("socket.io-client") as any;

class SocketIOMock extends EventEmitter {
  public io: { uri: string } = { uri: "" };

  public connected: boolean = false;

  public disconnected: boolean = true;

  private opts: SocketIOClient.ConnectOpts | undefined;

  public constructor(uri: string, opts?: SocketIOClient.ConnectOpts) {
    super();
    this.io.uri = uri;
    this.opts = opts;

    if (!this.opts || !!this.opts.autoConnect) {
      this.connect();
    }
  }

  public connect(): this {
    this.connected = true;
    this.disconnected = false;

    this.emit("connect");
    return this;
  }

  public disconnect(): this {
    this.connected = false;
    this.disconnected = true;

    this.emit("disconnect");
    return this;
  }

  public removeListener(event: string, fn?: (...args: any[]) => void): this {
    if (fn) {
      super.removeListener(event, fn);
    } else {
      super.removeAllListeners(event);
    }
    return this;
  }
}

socket.connect = (uri: string, opts?: SocketIOClient.ConnectOpts) => new SocketIOMock(uri, opts);

export default socket;
