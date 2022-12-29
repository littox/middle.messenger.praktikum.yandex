import BaseAPI from "./BaseAPI";

export interface SignupData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface SigninData {
    login: string;
    password: string;
}
export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}
export class AuthAPI extends BaseAPI {
  static BASE_URL = 'https://ya-praktikum.tech/api/v2/auth';
    create = undefined;
    update = undefined;
    delete = undefined;

    signUp(data: SignupData): Promise<unknown> {
        return this.http.post(`${AuthAPI.BASE_URL}/signup`, {headers: {
            'Content-Type': 'application/json'
          }, data: {...data}});
    }

    singIn(data: SigninData): Promise<unknown> {
        return this.http.post(`${AuthAPI.BASE_URL}/signin`, {headers: {
            'Content-Type': 'application/json'
          }, data: {...data}});
    }

    logout(): Promise<unknown> {
        return this.http.post(`${AuthAPI.BASE_URL}/logout`, {headers: {
            'Content-Type': 'application/json'
          }});
    }

    read(): Promise<User> {
        return this.http.get(`${AuthAPI.BASE_URL}/user`);
    }
}

// export default new AuthAPI();
