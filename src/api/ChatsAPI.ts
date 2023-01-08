import BaseAPI from './BaseAPI';
import { User } from './data/User';
import { AddUserToChatData, ChatInfo, CreateChatData } from './data/Chats';

export class ChatsAPI extends BaseAPI {

  constructor() {
    super('/chats');
  }

  update = undefined;

  delete = undefined;

  create(data: CreateChatData) {
    return this.http.post(`/`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  }

  read(): Promise<ChatInfo[]> {
    return this.http.get(`/`);
  }

  getUsers(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/${id}/users`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  addUsers(data: AddUserToChatData): Promise<unknown> {
    return this.http.put(`/users`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...data },
    });
  }

  deleteUsers(data: AddUserToChatData): Promise<unknown> {
    return this.http.delete(`/users`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...data },
    });
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.token;
  }
}
