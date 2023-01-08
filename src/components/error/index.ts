import { Component } from '../../utils/Component';
import template from './error.hbs';
import { Link } from '../link';
import { Routes } from '../../utils/Router';

export type ErrorProps = {
  code: string;
  text: string;
};

export class Error extends Component {
  protected init() {
    this.children.link = new Link({
      styles: 'home',
      text: 'Назад к чатам',
      url: Routes.Chat,
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
