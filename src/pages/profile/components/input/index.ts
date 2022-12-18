import template from './input.hbs';
import { TextInput, TextInputProps } from '../../../../components/text-input';

export type ProfileInputProps = { disabled: boolean } & TextInputProps;
export class ProfileInput extends TextInput {
  constructor(propsAndChildren: any) {
    super({ ...propsAndChildren });
  }

  render(): DocumentFragment {
    return this.compile(template, {
      ...this.props,
      value: this.getContent()?.querySelector('input')?.value || this.props.value,
    });
  }
}
