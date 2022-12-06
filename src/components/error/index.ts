import { Component } from '../../utils/Component';
import template from './error.hbs';

export type ErrorProps = {
  code: string;
  text: string;
};

export class Error extends Component {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
