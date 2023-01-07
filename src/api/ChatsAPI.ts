import BaseAPI from './BaseAPI';
import {User} from "./data/User";
import {AddUserToChatData, ChatInfo, CreateChatData} from "./data/Chats";


export class ChatsAPI extends BaseAPI {
  static BASE_URL = 'https://ya-praktikum.tech/api/v2/chats';
  update = undefined;

  create(data: CreateChatData) {
    return this.http.post(`${ChatsAPI.BASE_URL}/`, {headers: {
        'Content-Type': 'application/json'
      }, data: data});
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete(`${ChatsAPI.BASE_URL}/`, {headers: {
        'Content-Type': 'application/json'
      }, data: { chatId: id }});
  }

  read(): Promise<ChatInfo[]> {
    return this.http.get(`${ChatsAPI.BASE_URL}/`);
  }

  getUsers(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`${ChatsAPI.BASE_URL}/${id}/users`, {headers: {
        'Content-Type': 'application/json'
      }})
  }

  addUsers(data: AddUserToChatData): Promise<unknown> {
    return this.http.put(`${ChatsAPI.BASE_URL}/users`, {headers: {
        'Content-Type': 'application/json'
      }, data: { ...data }});
  }

  deleteUsers(data: AddUserToChatData): Promise<unknown> {
    return this.http.delete(`${ChatsAPI.BASE_URL}/users`, {headers: {
        'Content-Type': 'application/json'
      }, data: { ...data }});
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`${ChatsAPI.BASE_URL}/token/${id}`, {headers: {
        'Content-Type': 'application/json'
      }});

    return response.token;
  }
}
