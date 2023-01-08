import {Component} from '../../utils/Component';
import template from './chat.hbs';
import {NewChat} from './components/new-chat';
import {withStore} from '../../hocs/withStore';
import ChatsController from '../../controllers/ChatsController';
import MessagesController from '../../controllers/MessagesController';
import {ChatHeader} from './components/chat-header';
import {Link} from '../../components/link';
import {Routes} from '../../utils/Router';
import {ValidationRuleNames, validator} from "../../utils/Validator";

export class ChatBase extends Component {
  messageFormEvents() {
    const messageForm = this.getContent()?.querySelector('#message-form');
    messageForm?.addEventListener('submit', (event) => this.onMessage(event));
  }

  async onMessage(event: Event) {
    event.preventDefault();
    const input = document.getElementById('message-input') as HTMLInputElement;
    const errorMessages = validator.messages(input.value, [ValidationRuleNames.required]);
    if (errorMessages.length === 0) {
      await MessagesController.sendMessage(this.props.selectedChat.id, input?.value);
      input.value = '';
    }
    this.setProps({errorMessages: errorMessages});
  }

  addCustomEvents() {
    this.messageFormEvents();
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }

  protected init() {
    ChatsController.fetchChats();
    this.children.newChat = new NewChat({});
    this.children.chatHeader = new ChatHeader({});
    this.children.profileLink = new Link({
      url: Routes.Profile,
      text: 'Профиль &#8250;',
      styles: 'chat-profile-link',
    });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;
  if (!selectedChatId) {
    return {
      chats: [...(state.chats || [])],
      messages: [],
      selectedChat: undefined,
      userId: state.user?.id,
    };
  }

  return {
    chats: [...(state.chats || [])],
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat),
    userId: state.user.id,
  };
});

export const Chats = withSelectedChatMessages(ChatBase);
