import BaseAPI from './BaseAPI';
import {
  User, UserInfo, UserPassword, UserSearch,
} from './data/User';

export class UserAPI extends BaseAPI {

  constructor() {
    super('/user');
  }

  create = undefined;

  update = undefined;

  delete = undefined;

  updateProfile(data: UserInfo): Promise<User> {
    return this.http.put(`/profile`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...data },
    });
  }

  updatePassword(data: UserPassword): Promise<unknown> {
    return this.http.put(`/password`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...data },
    });
  }

  updateAvatar(data: FormData): Promise<unknown> {
    return this.http.put(`/profile/avatar`, { data });
  }

  read(id: string): Promise<User> {
    return this.http.get(`/${id}`);
  }

  search(data: UserSearch): Promise<User[]> {
    return this.http.post(`/search`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...data },
    });
  }
}
export const UserApiInstance = new UserAPI();
