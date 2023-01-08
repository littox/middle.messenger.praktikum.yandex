import { User } from './User';

export interface CreateChatData {
  title: string;
}
export interface AddUserToChatData {
  users: number[]
  chatId: number;
}

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: {
    user: User,
    time: string;
    content: string;
  }
}
