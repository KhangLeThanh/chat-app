export type UserInfo = {
  username: string;
  id: number;
};

export type Message = {
  id: number;
  content: string;
  user: UserInfo;
};
export type Thread = {
  name: string;
  id: string;
};
