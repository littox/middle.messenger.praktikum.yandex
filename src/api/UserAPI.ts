import BaseAPI from "./BaseAPI";
import {User, UserInfo, UserPassword} from "./data/User";

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
    changePassword(data: UserPassword): Promise<unknown> {
        return this.http.put(`${UserAPI.BASE_URL}/password`, {headers: {
            'Content-Type': 'application/json'
          }, data: {...data}});
    }
    // changeAvatar(data: FormData): Promise<unknown> {
    //     return this.http.put(`${UserAPI.BASE_URL}/profile/avatar`, {headers: {
    //         'Content-Type': 'application/json'
    //       }, data: {...data}});
    // }
    //

    read(id: string): Promise<User> {
        return this.http.get(`${UserAPI.BASE_URL}/${id}`);
    }
}
export const UserApiInstance = new UserAPI();
