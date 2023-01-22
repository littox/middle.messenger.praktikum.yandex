import BaseAPI from './BaseAPI';
import { User } from './data/User';

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

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  create = undefined;

  update = undefined;

  delete = undefined;

  signUp(data: SignupData): Promise<unknown> {
    return this.http.post('/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...data },
    });
  }

  singIn(data: SigninData): Promise<unknown> {
    return this.http.post('/signin', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...data },
    });
  }

  logout(): Promise<unknown> {
    return this.http.post('/logout', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  read(): Promise<User> {
    return this.http.get('/user');
  }
}

export const AuthApiInstance = new AuthAPI();
