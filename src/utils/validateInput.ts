import { validator } from './Validator';

export const onBlur = function (event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.tagName === 'INPUT') {
    event.preventDefault();
    const messages = validator.messages(input.value, [this.props.validation]);
    this.setProps({
      errors: messages,
    });
  }
};
