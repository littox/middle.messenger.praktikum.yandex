import { Component } from '../../utils/Component';
import template from './text-input.hbs';

export type TextInputProps = {
  type: string;
  name: string;
  placeholder: string;
  events: Record<string, () => void>
};
export class TextInput extends Component {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
