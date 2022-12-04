import template from './chat-item.hbs';
import Component from '../../../../utils/Component';

// export type ChatProps = {
//   chat: Record<string, any>;
// };

export default class ChatItem extends Component {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
