import {
  AuthAPI, AuthApiInstance, SigninData, SignupData,
} from '../api/AuthAPI';
import store from '../utils/Store';
import { router, Routes } from '../utils/Router';
import MessagesController from './MessagesController';
import {HTTPTransport} from "../utils/HTTPTransport";
import {User} from "../api/data/User";

export class AuthController {
  private readonly api: AuthAPI;

  constructor(api: AuthAPI) {
    this.api = api;
  }

  async signin(data: SigninData) {
    try {
      await this.api.singIn(data);

      router.go(Routes.Chat);
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
    this.setUserToStore(user)
  }
  public setUserToStore(user: User){
    user.avatar = user.avatar ? `${HTTPTransport.RESOURCE_URL}${user.avatar}` : null;
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
