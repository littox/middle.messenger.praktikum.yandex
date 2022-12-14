import { TextInput } from './components/text-input';
import { Auth, AuthProps } from './pages/auth';
import { registerComponent } from './utils/registerComponent';
import { BaseForm, BaseFormProps } from './components/base-form';
import { Error, ErrorProps } from './components/error';
import { Component } from './utils/Component';
import { ChatItem } from './pages/chat/components/chat-item';
import { Chat, ChatProps } from './pages/chat';
import { chats } from './pages/chat/data/chats';
import { ProfileInput } from './pages/profile/components/input';
import { Profile, ProfileProps } from './pages/profile';
import { ValidationRuleNames } from './utils/Validator';
import { onBlur } from './utils/validateInput';
import { ProfileForm } from './pages/profile/components/form';

registerComponent('TextInput', TextInput);
registerComponent('BaseForm', BaseForm);
registerComponent('ChatItem', ChatItem);
registerComponent('ProfileInput', ProfileInput);
registerComponent('ProfileForm', ProfileForm);

const submitFn = function (event: Event) {
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
  console.log(res);

  setTimeout(() => { window.location.assign('/chat'); }, 2000);
};

type Routing = Record<string, () => Component>;

const PAGES: Routing = {
  '/404': () => new Error({
    code: '404',
    text: 'Не туда попали',
  } as ErrorProps),
  '/500': () => new Error({
    code: '500',
    text: 'Мы уже фиксим',
  } as ErrorProps),
  '/chat': () => new Chat({ chats } as ChatProps),
  '/profile': () => new Profile({ isActiveForm: false } as ProfileProps),
  '/registration': () => new Auth({
    form: new BaseForm({
      events: {
        submit: submitFn,
      },
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
      link: {
        url: '/',
        text: 'Войти',
      },
    } as BaseFormProps),
  } as AuthProps),

  '/': () => new Auth({
    form: new BaseForm({
      events: {
        submit: submitFn,
      },
      action: '/',
      formTitle: 'Вход',
      submitLink: '/',
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
      link: {
        url: '/registration',
        text: 'Зарегистрироваться',
      },
    } as BaseFormProps),
  } as AuthProps),
};

function renderPage(name: string): void {
  const root = document.getElementById('app');
  if (!PAGES[name]) {
    window.location.assign('/404');
  }
  const component: () => Component = PAGES[name];

  root?.append(component().getContent()!);
}

window.renderPage = renderPage;

document.addEventListener('DOMContentLoaded', () => {
  renderPage(window.location.pathname);
});
