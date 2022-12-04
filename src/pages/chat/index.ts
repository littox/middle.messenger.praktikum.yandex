import Component from '../../utils/Component';
import template from './chat.hbs';

export type ChatProps = {
  chats: Record<string, any>[];
};

export default class Chat extends Component {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}
