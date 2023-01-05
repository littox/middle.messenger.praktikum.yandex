import template from './chat-item.hbs';
import { Component } from '../../../../utils/Component';
import {withStore} from "../../../../hocs/withStore";
import {ChatInfo} from "../../../../api/data/Chats";
import ChatsController from "../../../../controllers/ChatsController";

interface ChatItemProps extends ChatInfo{
  chat: ChatInfo;
  selectedChat?: ChatInfo;
  isSelected: boolean;
}
export class ChatItemBase extends Component<ChatItemProps> {

  constructor(propsAndChildren: any) {
    super(
      { ...propsAndChildren,
        events: {
          click: () => {
            ChatsController.selectChat(propsAndChildren.chat.id)
          }
        }}
    );
  }
  render(): DocumentFragment {
    return this.compile(template, {...this.props, isSelected: this.props.chat.id === this.props.selectedChat?.id});
  }
}
export const withSelectedChat = withStore(state => ({selectedChat: (state.chats || []).find(({id}) => id === state.selectedChat)}));

export const ChatItem = withSelectedChat(ChatItemBase);

