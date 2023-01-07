import { Component } from '../../utils/Component';
import template from './chat.hbs';
import {NewChat} from "./components/new-chat";
import {withStore} from "../../hocs/withStore";
import ChatsController from "../../controllers/ChatsController";
import {AddUser} from "./components/add-user";
import {RemoveUser} from "./components/remove-user";


export class ChatBase extends Component {
  addCustomEvents() {
    let menuBtn = this.getContent()?.querySelector("#chat-menu-button") as HTMLElement;
    menuBtn.onclick = () => {
      document.getElementById("chat-menu")?.classList.toggle("hide");
    }


    let addUserCmd = this.getContent()?.querySelector("#chat-menu-add-user") as HTMLElement;
    let modal = this.getContent()?.querySelector("#add-user-modal") as HTMLElement;
    addUserCmd.onclick = () => {
      modal.style.display = 'flex';
    }

    if (modal) {
      window.onclick = function fn(event) {
        if (event.target === modal) {
          modal!.style.display = 'none';
        }
      };
    }

    let removeUserCmd = this.getContent()?.querySelector("#chat-menu-remove-user") as HTMLElement;
    let removeUserModal = this.getContent()?.querySelector("#remove-user-modal") as HTMLElement;
    removeUserCmd.onclick = () => {
      removeUserModal.style.display = 'flex';
    }

    if (removeUserModal) {
      window.onclick = function fn(event) {
        if (event.target === removeUserModal) {
          removeUserModal!.style.display = 'none';
        }
      };
    }
  }

  render(): DocumentFragment {
    let res = this.compile(template, { ...this.props, children: this.children });
    return res;
  }

  protected init() {
    ChatsController.fetchChats();
    this.children.newChat = new NewChat({});
    this.children.addUser = new AddUser({users: [], disabled: true})
    this.children.removeUsers = new RemoveUser({users: []})
  }
}

const withChats = withStore((state) => ({
  chats: [ ...(state.chats || []) ],
  selectedChat: (state.chats || []).find(({id}) => id === state.selectedChat),
}))

export const Chats = withChats(ChatBase);
