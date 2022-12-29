import store from '../utils/Store';
import {router, Routes} from '../utils/Router';
import {UserAPI, UserApiInstance} from "../api/UserAPI";
import {UserInfo, UserPassword} from "../api/data/User";

export class ProfileController {
  private readonly api: UserAPI;

  constructor(api: UserAPI) {
    this.api = api;
  }

  async updateProfile(data: UserInfo) {
    try {
      const user = await this.api.updateProfile(data);
      store.set('user', user);
      router.go(Routes.Profile);
    } catch (e: any) {
      console.error(e);
    }
  }

  async updatePassword(data: UserPassword) {
    try {
      await this.api.changePassword(data);
      router.go(Routes.Profile);
    } catch (e: any) {
      console.error(e);
    }
  }
}

export default new ProfileController(UserApiInstance);
