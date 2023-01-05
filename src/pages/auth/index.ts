import { Component } from '../../utils/Component';
import template from './auth.hbs';
import {BaseForm} from '../../components/base-form';
import {onBlur} from "../../utils/validateInput";
import {ValidationRuleNames} from "../../utils/Validator";
import {Link} from "../../components/link";
import {Routes} from "../../utils/Router";
import {SigninData} from "../../api/AuthAPI";
import AuthController from "../../controllers/AuthController";

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
          events: {
            focusout: onBlur,
          },
          errors: [],
          validation: ValidationRuleNames.login,
        },
        {
          type: 'password',
          placeholder: 'Пароль',
          name: 'password',
          events: {
            focusout: onBlur,
          },
          errors: [],
          validation: ValidationRuleNames.password,
        },
      ],
      link: new Link({
        url: Routes.Registration,
        text: 'Зарегистрироваться',
      }),
    })
  }

  render(): DocumentFragment {
    return this.compile(template, { form: this.children.form });
  }
}
