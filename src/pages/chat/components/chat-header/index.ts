import template from './chat-header.hbs';
import { Component } from '../../../../utils/Component';
import { withStore } from '../../../../hocs/withStore';
import { AddUser } from '../add-user';
import { RemoveUser } from '../remove-user';
import chatsController from "../../../../controllers/ChatsController";

class ChatHeaderBase extends Component {
  addCustomEvents() {
    const menuBtn = this.getContent()?.querySelector('#chat-menu-button') as HTMLElement;
    menuBtn.onclick = () => {
      document.getElementById('chat-menu')?.classList.toggle('hide');
    };

    const removeChatCmd = this.getContent()?.querySelector('#chat-menu-remove-chat') as HTMLElement;
    removeChatCmd.onclick = async () => {
      await chatsController.delete(this.props.selectedChat.id)
    }

    const addUserCmd = this.getContent()?.querySelector('#chat-menu-add-user') as HTMLElement;
    const addUserModal = this.getContent()?.querySelector('#add-user-modal') as HTMLElement;
    addUserCmd.onclick = () => {
      addUserModal.style.display = 'flex';
    };

    const removeUserCmd = this.getContent()?.querySelector('#chat-menu-remove-user') as HTMLElement;
    const removeUserModal = this.getContent()?.querySelector('#remove-user-modal') as HTMLElement;
    removeUserCmd.onclick = () => {
      removeUserModal.style.display = 'flex';
    };

    if (removeUserModal || addUserModal) {
      window.onclick = function fn(event) {
        if (event.target === removeUserModal || event.target === addUserModal) {
          (event.target as HTMLElement).style.display = 'none';
        }
      };
    }
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  protected init() {
    this.children.addUser = new AddUser({ users: [], disabled: true });
    this.children.removeUsers = new RemoveUser({ users: [] });
  }
}
export const withSelectedChat = withStore((state) => ({ selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat) }));

export const ChatHeader = withSelectedChat(ChatHeaderBase);
