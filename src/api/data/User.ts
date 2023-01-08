export interface User extends UserInfo {
  id: number;
  avatar: string;
}

export interface UserInfo {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}
export interface UserPassword {
  oldPassword: string;
  newPassword: string;
}
export interface UserSearch {
  login: string;
}
