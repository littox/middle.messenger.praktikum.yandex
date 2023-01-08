import {
  AuthAPI, AuthApiInstance, SigninData, SignupData,
} from '../api/AuthAPI';
import store from '../utils/Store';
import { router, Routes } from '../utils/Router';
import MessagesController from './MessagesController';

export class AuthController {
  private readonly api: AuthAPI;

  constructor(api: AuthAPI) {
    this.api = api;
  }

  async signin(data: SigninData) {
    try {
      await this.api.singIn(data);

      router.go(Routes.Profile);
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signUp(data);
      await this.fetchUser();
      router.go(Routes.Chat);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set('user', user);
  }

  async logout() {
    try {
      await MessagesController.closeAll();
      await this.api.logout();
      router.go(Routes.Index);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController(AuthApiInstance);
