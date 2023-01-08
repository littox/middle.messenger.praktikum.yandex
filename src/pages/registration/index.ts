import { Component } from '../../utils/Component';
import template from './auth.hbs';
import { BaseForm } from '../../components/base-form';
import { ValidationRuleNames } from '../../utils/Validator';
import { Routes } from '../../utils/Router';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthAPI';
import { Link } from '../../components/link';

export class Registration extends Component {
  init() {
    this.children.form = new BaseForm({
      action: (data: object) => AuthController.signup(data as SignupData),
      formTitle: 'Регистрация',
      submitText: 'Зарегистрироваться',
      inputs: [
        {
          type: 'text',
          placeholder: 'Почта',
          name: 'email',
          validation: ValidationRuleNames.email,
          errors: [],
        },
        {
          type: 'text',
          placeholder: 'Логин',
          name: 'login',
          validation: ValidationRuleNames.login,
          errors: [],
        },
        {
          type: 'text',
          placeholder: 'Имя',
          name: 'first_name',
          validation: ValidationRuleNames.name,
          errors: [],
        },
        {
          type: 'text',
          placeholder: 'Фамилия',
          name: 'second_name',
          validation: ValidationRuleNames.name,
          errors: [],
        },
        {
          type: 'text',
          placeholder: 'Телефон',
          name: 'phone',
          validation: ValidationRuleNames.phone,
          errors: [],
        },
        {
          type: 'password',
          placeholder: 'Пароль',
          name: 'password',
          validation: ValidationRuleNames.password,
          errors: [],
        },
        {
          type: 'password',
          placeholder: 'Пароль (еще раз)',
          name: 'password_confirmation',
          validation: ValidationRuleNames.password,
          errors: [],
        },
      ],
      // @ts-ignore
      link: new Link({
        url: Routes.Index,
        text: 'Войти',
      }),
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { form: this.children.form });
  }
}
