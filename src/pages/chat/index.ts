import { Component } from '../../utils/Component';
import template from './chat.hbs';
import {NewChat} from "./components/new-chat";
import {withStore} from "../../hocs/withStore";
import ChatsController from "../../controllers/ChatsController";


export class ChatBase extends Component {
  protected init() {
    ChatsController.fetchChats();
    this.children.newChat = new NewChat();
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}

const withChats = withStore((state) => ({
  chats: [ ...(state.chats || []) ],
}))

export const Chats = withChats(ChatBase);
