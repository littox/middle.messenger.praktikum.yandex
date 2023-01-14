import template from './profile.hbs';
import { Component } from '../../utils/Component';

export class PasswordEdit extends Component {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}
