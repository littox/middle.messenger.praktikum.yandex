import Component from '../../utils/Component';
import template from './auth.hbs';

type AuthProps = {
  action: string;
  formTitle: string;
  submitLink: string;
  submitText: string;
};

export default class Auth extends Component<AuthProps> {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
    // return template({ ...this.props });
  }
}
