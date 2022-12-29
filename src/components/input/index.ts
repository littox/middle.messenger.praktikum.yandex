import template from './input.hbs';
import { TextInput, TextInputProps } from '../text-input';

export type ProfileInputProps = TextInputProps;
export class ProfileInput extends TextInput {
  constructor(propsAndChildren: ProfileInputProps) {
    super({ ...propsAndChildren });
  }

  render(): DocumentFragment {
    return this.compile(template, {
      ...this.props,
      value: this.getContent()?.querySelector('input')?.value || this.props.value,
    });
  }
}
