import { EventEmitter } from "events";

// Mock for socket.io-client
const socket = jest.genMockFromModule("socket.io-client") as any;

type Callback = (...args: any[]) => void;

class SocketIOMock extends EventEmitter {
  public io: { uri: string } = { uri: "" };

  public connected: boolean = false;

  public disconnected: boolean = true;

  private opts: SocketIOClient.ConnectOpts | undefined;

  // methods
  public connect: jest.Mock<this, []>;

  public disconnect: jest.Mock<this, []>;

  public removeListener: jest.Mock<this, [string, Callback?]>;

  public send: jest.Mock<this, [...any[]]>;

  public constructor(uri: string, opts?: SocketIOClient.ConnectOpts) {
    super();
    this.io.uri = uri;
    this.opts = opts;
    this.connect = jest.fn(this.connectImpl);
    this.disconnect = jest.fn(this.disconnectImpl);
    this.removeListener = jest.fn(this.removeListenerImpl);
    this.send = jest.fn(this.sendImpl);

    if (!this.opts || !!this.opts.autoConnect) {
      this.connect();
    }
  }

  private connectImpl(): this {
    this.connected = true;
    this.disconnected = false;

    this.emit("connect");
    return this;
  }

  private disconnectImpl(): this {
    this.connected = false;
    this.disconnected = true;

    this.emit("disconnect");
    return this;
  }

  private removeListenerImpl(event: string, fn?: (...args: any[]) => void): this {
    if (fn) {
      super.removeListener(event, fn);
    } else {
      super.removeAllListeners(event);
    }
    return this;
  }

  private sendImpl(...args: any[]): this {
    this.emit("message", ...args);
    return this;
  }
}

socket.connect = (uri: string, opts?: SocketIOClient.ConnectOpts) => new SocketIOMock(uri, opts);

export default socket;
