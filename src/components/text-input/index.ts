import Component from '../../utils/Component';
import template from './text-input.hbs';

type TextInputProps = {
  type: string;
  name: string;
  placeholder: string;
  events: Record<string, () => void>
};
export default class TextInput extends Component {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
