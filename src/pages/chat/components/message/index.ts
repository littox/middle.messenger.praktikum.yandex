import template from './message.hbs';
import { Component } from '../../../../utils/Component';
import { MessageData } from '../../../../api/data/MessageData';

interface MessageProps {
  message: MessageData;
  userId: number;
  isMine: Boolean;
}

export class Message extends Component<MessageProps> {
  constructor(props: MessageProps) {
    console.log(props);
    super({ ...props, isMine: props.message.user_id === props.userId });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
