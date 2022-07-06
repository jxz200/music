interface IUserList {
  id: number;
  username: string;
  email: string;
  mobile: string;
  role_name: string;
  mg_state: boolean;
}
interface IUserInfo {
  id: number;
  rid: number;
  mobile: string;
  email: string;
  username: string;
}

export type { IUserList, IUserInfo };
