import Component from '../../utils/Component';
import template from './base-form.hbs';
import { TextInputProps } from '../text-input';

export type BaseFormProps = {
  events: Record<string, EventListener>
  action: string;
  formTitle: string;
  submitLink: string;
  submitText: string;
  inputs: TextInputProps[];
  link: { url: string, text: string };
};

export default class BaseForm extends Component {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}
