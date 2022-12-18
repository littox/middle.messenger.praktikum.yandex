import { Component } from '../../utils/Component';
import template from './chat.hbs';

type ChatFields = {
  avatarUrl?: string;
  chatTitle: string;
  from: string;
  message: string;
  unreadCount: number;
  date: string;
  active: boolean;
};

export type ChatProps = {
  chats: ChatFields[];
};

export class Chat extends Component {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}
