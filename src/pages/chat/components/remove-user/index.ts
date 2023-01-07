import {Component} from "../../../../utils/Component";
import template from "./remove-user.hbs";
import ChatsController from "../../../../controllers/ChatsController";
import {ChatInfo} from "../../../../api/data/Chats";
import {User} from "../../../../api/data/User";
import {withStore} from "../../../../hocs/withStore";

interface RemoveUserProps {
  users: User[];
  selectedChat: ChatInfo;
}

export class RemoveUserBase extends Component<RemoveUserProps> {
  constructor(propsAndChildren: RemoveUserProps) {
    super(propsAndChildren);
  }

  removeUsersFormEvents() {
    let addUserForm = this.getContent()?.querySelector('#remove-user');
    addUserForm?.addEventListener("submit", (event) => this.onUserRemove(event));
  }

  init() {
  }

  async onUserRemove(event: Event) {
    event.preventDefault();
    let users = [...(event.target as HTMLFormElement).querySelectorAll('input[name=users]:checked')]
      .map((input) => +(input as HTMLInputElement).value);

    if (!this.props.selectedChat) {
      console.log('chat is not selected');
      return;
    }
    await ChatsController.deleteUsers({
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
    this.removeUsersFormEvents();
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}
const withChats = withStore((state) => ({
  selectedChat: (state.chats || []).find((chat) => chat.id === state.selectedChat),
  users: state.selectedChatUsers,
}))

export const RemoveUser = withChats(RemoveUserBase);
