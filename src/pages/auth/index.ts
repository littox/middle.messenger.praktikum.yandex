import { Component } from '../../utils/Component';
import template from './auth.hbs';
import { BaseForm } from '../../components/base-form';

export type AuthProps = {
  form: BaseForm;
};

export class Auth extends Component {
  render(): DocumentFragment {
    return this.compile(template, { form: this.children.form });
  }
}
