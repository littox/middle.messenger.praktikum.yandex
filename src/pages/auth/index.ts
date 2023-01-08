import { Component } from '../../utils/Component';
import template from './auth.hbs';
import { BaseForm } from '../../components/base-form';
import { ValidationRuleNames } from '../../utils/Validator';
import { Link } from '../../components/link';
import { Routes } from '../../utils/Router';
import { SigninData } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';

export class Auth extends Component {
  init() {
    this.children.form = new BaseForm({
      action: (data: object) => AuthController.signin(data as SigninData),
      formTitle: 'Вход',
      submitText: 'Войти',
      inputs: [
        {
          type: 'text',
          placeholder: 'Логин',
          name: 'login',
          errors: [],
          validation: ValidationRuleNames.login,
        },
        {
          type: 'password',
          placeholder: 'Пароль',
          name: 'password',
          errors: [],
          validation: ValidationRuleNames.password,
        },
      ],
      // @ts-ignore
      link: new Link({
        url: Routes.Registration,
        text: 'Зарегистрироваться',
      }),
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { form: this.children.form });
  }
}
