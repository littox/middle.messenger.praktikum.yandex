import {Component} from "../../../../utils/Component";
import template from "./add-user.hbs";
import ChatsController from "../../../../controllers/ChatsController";
import {ChatInfo} from "../../../../api/data/Chats";
import {User, UserSearch} from "../../../../api/data/User";
import ProfileController from "../../../../controllers/ProfileController";
import {withStore} from "../../../../hocs/withStore";

interface AddUserProps {
  users: User[];
  disabled: Boolean;
  selectedChat: ChatInfo;
}

export class AddUserBase extends Component<AddUserProps> {
  constructor(propsAndChildren: AddUserProps) {
    super(propsAndChildren);
  }

  searchFormEvents() {
    let searchForm = this.getContent()?.querySelector('#search-user');
    searchForm?.addEventListener("submit", (event) => this.onUserSearch(event));
  }
  addUsersFormEvents() {
    let addUserForm = this.getContent()?.querySelector('#add-user');
    addUserForm?.addEventListener("submit", (event) => this.onUserAdd(event));
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

    let res = await ProfileController.search(data as UserSearch);

    this.setProps({disabled: !res.length, users: res});
  }

  async onUserAdd(event: Event) {
    event.preventDefault();
    let users = [...(event.target as HTMLFormElement).querySelectorAll('input[name=users]:checked')]
      .map((input) => +(input as HTMLInputElement).value);

    if (!this.props.selectedChat) {
      console.log('chat is not selected');
      return;
    }
    // let res = await ChatsController.addUserToChat({
    await ChatsController.addUserToChat({
      users: users,
      chatId: this.props.selectedChat.id
    });
  }
  // showModal() {
  //   let el = this.getContent()?.querySelector('#new-chat-add') as HTMLElement;
  //   if (el) {
  //     el.onclick = () => {
  //       document.getElementById('new-chat-modal')?.classList.toggle('hide');
  //     };
  //   }
  // }
  //
  // hideModal() {
  //   document.getElementById('new-chat-modal')?.classList.add('hide');
  // }
  //
  // onChatAdd(data: object) {
  //   ChatsController.create(data as CreateChatData)
  //   this.hideModal()
  // }
  addCustomEvents() {
    this.searchFormEvents();
    this.addUsersFormEvents();
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}
const withChats = withStore((state) => ({
  // chats: [ ...(state.chats || []) ],
  selectedChat: (state.chats || []).find(({id}) => id === state.selectedChat),
}))

export const AddUser = withChats(AddUserBase);
