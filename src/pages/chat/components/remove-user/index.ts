import { Component } from '../../../../utils/Component';
import template from './remove-user.hbs';
import ChatsController from '../../../../controllers/ChatsController';
import { ChatInfo } from '../../../../api/data/Chats';
import { User } from '../../../../api/data/User';
import { withStore } from '../../../../hocs/withStore';

interface RemoveUserProps {
  users: User[];
  selectedChat: ChatInfo;
}

export class RemoveUserBase extends Component<RemoveUserProps> {
  init() {
  }

  async onUserRemove(event: Event) {
    event.preventDefault();
    const users = [...(event.target as HTMLFormElement).querySelectorAll('input[name=users]:checked')]
      .map((input) => +(input as HTMLInputElement).value);

    if (!this.props.selectedChat) {
      return;
    }
    await ChatsController.deleteUsers({
      users,
      chatId: this.props.selectedChat.id,
    });
  }

  removeUsersFormEvents() {
    const addUserForm = this.getContent()?.querySelector('#remove-user');
    addUserForm?.addEventListener('submit', (event) => this.onUserRemove(event));
  }

  addCustomEvents() {
    this.removeUsersFormEvents();
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}
const withChats = withStore((state) => ({
  selectedChat: (state.chats || []).find((chat) => chat.id === state.selectedChat),
  users: state.selectedChatUsers,
}));

export const RemoveUser = withChats(RemoveUserBase);
