import { Component } from '../../../../utils/Component';
import template from './add-user.hbs';
import ChatsController from '../../../../controllers/ChatsController';
import { ChatInfo } from '../../../../api/data/Chats';
import { User, UserSearch } from '../../../../api/data/User';
import ProfileController from '../../../../controllers/ProfileController';
import { withStore } from '../../../../hocs/withStore';

interface AddUserProps {
  users: User[];
  disabled: Boolean;
  selectedChat: ChatInfo;
}

export class AddUserBase extends Component<AddUserProps> {
  constructor(propsAndChildren: AddUserProps) {
    super(propsAndChildren);
  }

  addUsersFormEvents() {
    const addUserForm = this.getContent()?.querySelector('#add-user');
    addUserForm?.addEventListener('submit', (event) => this.onUserAdd(event));
  }

  init() {
  }

  async onUserSearch(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data: Record<string, any> = {};
    [...formData.entries()].forEach(([key, value]) => {
      data[key] = value;
    });

    const res = await ProfileController.search(data as UserSearch);

    this.setProps({ disabled: !res.length, users: res });
  }

  async onUserAdd(event: Event) {
    event.preventDefault();
    const users = [...(event.target as HTMLFormElement).querySelectorAll('input[name=users]:checked')]
      .map((input) => +(input as HTMLInputElement).value);

    if (!this.props.selectedChat) {
      return;
    }
    await ChatsController.addUserToChat({
      users,
      chatId: this.props.selectedChat.id,
    });
  }

  searchFormEvents() {
    const searchForm = this.getContent()?.querySelector('#search-user');
    searchForm?.addEventListener('submit', (event) => this.onUserSearch(event));
  }

  addCustomEvents() {
    this.searchFormEvents();
    this.addUsersFormEvents();
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}
const withChats = withStore((state) => ({
  selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat),
}));

export const AddUser = withChats(AddUserBase);
