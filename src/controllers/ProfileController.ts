import { router, Routes } from '../utils/Router';
import { UserAPI, UserApiInstance } from '../api/UserAPI';
import {
  User, UserInfo, UserPassword, UserSearch,
} from '../api/data/User';
import AuthController from "./AuthController";

class ProfileController {
  private readonly api: UserAPI;

  constructor(api: UserAPI) {
    this.api = api;
  }

  async updateProfile(data: UserInfo) {
    try {
      const user = await this.api.updateProfile(data);
      AuthController.setUserToStore(user);
      router.go(Routes.Profile);
    } catch (e: any) {
      console.error(e);
    }
  }

  async updatePassword(data: UserPassword) {
    try {
      await this.api.updatePassword(data);
      router.go(Routes.Profile);
    } catch (e: any) {
      console.error(e);
    }
  }

  async updateAvatar(data: FormData) {
    try {
      const user = await this.api.updateAvatar(data);
      AuthController.setUserToStore(user);
    } catch (e: any) {
      console.error(e);
    }
  }

  async search(data: UserSearch): Promise<User[]> {
    return this.api.search(data);
  }
}

export default new ProfileController(UserApiInstance);
