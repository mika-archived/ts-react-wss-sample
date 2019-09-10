export type MessageRequest = {
  content: string;
};

export type MessageResponse = {
  content: string;
  timestamp: number;
  username: string;
};

export type JoinRequest = {
  roomId: string;
  username: string;
};

export type LeaveRequest = {};
