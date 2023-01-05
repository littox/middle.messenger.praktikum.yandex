import {Component} from '../../utils/Component';
import template from './base-form.hbs';
import {TextInput, TextInputProps} from '../text-input';
import {Link} from "../link";

export type BaseFormProps = {
  events?: Record<string, EventListener>
  action: (data: object) => void;
  formTitle?: string;
  submitText: string;
  inputs: TextInputProps[];
  link?: typeof Link;
};

export class BaseForm extends Component<BaseFormProps> {

  constructor(propsAndChildren: BaseFormProps) {
    super({
      ...propsAndChildren, events: {
        submit: (event: Event) => {
          event.preventDefault();
          let isValid: boolean = true;
          Object.values(this.children).forEach((component) => {
            if (component instanceof TextInput) {
              isValid = component.isValid() && isValid;
            }
          });
          const formData = new FormData(event.target as HTMLFormElement);
          const res: Record<string, unknown> = {};
          [...formData.entries()].forEach(([key, value]) => {
            res[key] = value;
          });
          if (isValid) {
            this.props.action(res);
          }
        }
      }
    });
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props, children: this.children});
  }
}
