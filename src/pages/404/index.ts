import { Component } from '../../utils/Component';
import template from './404.hbs';
import { Error } from '../../components/error';

export class NotFound extends Component {
  init() {
    this.children.error = new Error({
      code: '404',
      text: 'Не туда попали',
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { error: this.children.error });
  }
}
