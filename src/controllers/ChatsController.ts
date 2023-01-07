import { ChatsAPI } from '../api/ChatsAPI';
import store from '../utils/Store';
import {AddUserToChatData, CreateChatData} from "../api/data/Chats";
import MessagesController from "./MessagesController";

class ChatsController {
  private readonly api: ChatsAPI;

  constructor(api: ChatsAPI) {
    this.api = api;
  }

  async create(data: CreateChatData) {
    await this.api.create(data);

    await this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.read();

    let promises = chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      return MessagesController.connect(chat.id, token);
    });
    await Promise.all(promises);

    store.set('chats', chats);
  }

  async addUserToChat(data: AddUserToChatData) {
    await this.api.addUsers(data);
  }

  async deleteUsers(data: AddUserToChatData) {
    try {
      await this.api.deleteUsers(data);
      let res = await this.api.getUsers(data.chatId)
      store.set('selectedChatUsers',  res);
    } catch (e: any) {
      console.log('Ошибка удаления пользователя:', e);
    }
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.fetchChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  async selectChat(chatId: number) {
    store.set('selectedChat',  chatId);
    let res = await this.api.getUsers(chatId)
    store.set('selectedChatUsers',  res);
  }
}

export default new ChatsController(new ChatsAPI());
