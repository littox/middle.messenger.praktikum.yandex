import BaseAPI from "./BaseAPI";
import {User, UserInfo, UserPassword, UserSearch} from "./data/User";

export class UserAPI extends BaseAPI {
  static BASE_URL = 'https://ya-praktikum.tech/api/v2/user';
    create = undefined;
    update = undefined;
    delete = undefined;

    updateProfile(data: UserInfo): Promise<User> {
        return this.http.put(`${UserAPI.BASE_URL}/profile`, {headers: {
            'Content-Type': 'application/json'
          }, data: {...data}});
    }
    updatePassword(data: UserPassword): Promise<unknown> {
        return this.http.put(`${UserAPI.BASE_URL}/password`, {headers: {
            'Content-Type': 'application/json'
          }, data: {...data}});
    }
    updateAvatar(data: FormData): Promise<unknown> {
        return this.http.put(`${UserAPI.BASE_URL}/profile/avatar`, {data: data});
    }


    read(id: string): Promise<User> {
        return this.http.get(`${UserAPI.BASE_URL}/${id}`);
    }

    search(data: UserSearch): Promise<User[]> {
        return this.http.post(`${UserAPI.BASE_URL}/search`, {headers: {
            'Content-Type': 'application/json'
          }, data: {...data}});
    }
}
export const UserApiInstance = new UserAPI();
