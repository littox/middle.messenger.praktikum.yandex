import { Component } from '../../utils/Component';
import template from './auth.hbs';
import { BaseForm } from '../../components/base-form';
import {onBlur} from "../../utils/validateInput";
import {ValidationRuleNames} from "../../utils/Validator";
import {Link} from "../../components/link";
import {Routes} from "../../utils/Router";

export class Registration extends Component {
  init() {
    this.children.form = new BaseForm({
      action: '/',
      formTitle: 'Регистрация',
      submitLink: '/',
      submitText: 'Зарегистрироваться',
      inputs: [
        {
          type: 'text',
          placeholder: 'Почта',
          name: 'email',
          validation: ValidationRuleNames.email,
          errors: [],
          events: {
            focusout: onBlur,
          },
        },
        {
          type: 'text',
          placeholder: 'Логин',
          name: 'login',
          events: {
            focusout: onBlur,
          },
          validation: ValidationRuleNames.login,
          errors: [],
        },
        {
          type: 'text',
          placeholder: 'Имя',
          name: 'first_name',
          events: {
            focusout: onBlur,
          },
          validation: ValidationRuleNames.name,
          errors: [],
        },
        {
          type: 'text',
          placeholder: 'Фамилия',
          name: 'second_name',
          events: {
            focusout: onBlur,
          },
          validation: ValidationRuleNames.name,
          errors: [],
        },
        {
          type: 'text',
          placeholder: 'Телефон',
          name: 'phone',
          events: {
            focusout: onBlur,
          },
          validation: ValidationRuleNames.phone,
          errors: [],
        },
        {
          type: 'password',
          placeholder: 'Пароль',
          name: 'password',
          events: {
            focusout: onBlur,
          },
          validation: ValidationRuleNames.password,
          errors: [],
        },
        {
          type: 'password',
          placeholder: 'Пароль (еще раз)',
          name: 'password_confirmation',
          events: {
            focusout: onBlur,
          },
          validation: ValidationRuleNames.password,
          errors: [],
        },
      ],
      link: new Link({
        url: Routes.Index,
        text: 'Войти',
      }),
    })
  }
  render(): DocumentFragment {
    return this.compile(template, { form: this.children.form });
  }
}
