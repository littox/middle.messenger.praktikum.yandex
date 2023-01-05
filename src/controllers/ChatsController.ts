import { ChatsAPI } from '../api/ChatsAPI';
import store from '../utils/Store';
import {CreateChatData} from "../api/data/Chats";

class ChatsController {
  private readonly api: ChatsAPI;

  constructor(api: ChatsAPI) {
    this.api = api;
  }

  async create(data: CreateChatData) {
    await this.api.create(data);

    this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.read();

    store.set('chats', chats);
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.fetchChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(chatId: number) {
    store.set('selectedChat',  chatId);
  }
}

export default new ChatsController(new ChatsAPI());
