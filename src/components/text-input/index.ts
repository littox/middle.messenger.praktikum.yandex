import {Component} from '../../utils/Component';
import template from './text-input.hbs';
import {ValidationRuleNames, validator} from '../../utils/Validator';

export type TextInputProps = {
  value?: string;
  type: string;
  name: string;
  placeholder: string;
  events?: Record<string, EventListener>;
  errors: string[];
  validation?: ValidationRuleNames;
};

export class TextInput extends Component<TextInputProps> {

  constructor(propsAndChildren: TextInputProps) {
    super({
      ...propsAndChildren,
      events: {
        focusout: (e: Event) => this.onBlur(e),
      },
    });
  }

  isValid(): boolean {
    const inp = this.getContent()?.querySelector('input');
    inp?.focus();
    inp?.blur();
    const {errors} = this.props;
    return errors?.length === 0;
  }

  render(): DocumentFragment {
    const {props} = this;
    return this.compile(template, {
      ...props,
      value: this.getContent()?.querySelector('input')?.value || props.value,
    });
  }

  private onBlur(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.tagName === 'INPUT') {
      event.preventDefault();
      const messages = validator.messages(input.value, this.props.validation ? [this.props.validation] : []);
      this.setProps({
        errors: messages,
      });
    }
  }
}
