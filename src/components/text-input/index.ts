import { Component } from '../../utils/Component';
import template from './text-input.hbs';
import { ValidationRuleNames } from '../../utils/Validator';

export type TextInputProps = {
  value?: string;
  type: string;
  name: string;
  placeholder: string;
  events: Record<string, EventListener>;
  errors: string[];
  validation?: ValidationRuleNames;
};
export class TextInput extends Component {
  isValid(): boolean {
    const inp = this.getContent()?.querySelector('input');
    inp?.focus();
    inp?.blur();
    const { errors } = this.props;
    return errors?.length === 0;
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, value: this.getContent()?.querySelector('input')?.value });
  }
}
