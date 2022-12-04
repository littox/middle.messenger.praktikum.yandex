import template from './chat-item.hbs';
import Component from '../../../../utils/Component';

export default class ChatItem extends Component {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
