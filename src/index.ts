import { TextInput } from './components/text-input';
import { Auth, AuthProps } from './pages/auth';
import { registerComponent } from './utils/registerComponent';
import { BaseForm, BaseFormProps } from './components/base-form';
import { Error, ErrorProps } from './components/error';
import { Component } from './utils/Component';
import { ChatItem } from './pages/chat/components/chat-item';
import { Chat, ChatProps } from './pages/chat';
import { chats } from './pages/chat/data/chats';
import { inputs } from './pages/profile/data/inputs';
import { ProfileInput } from './pages/profile/components/input';
import { Profile, ProfileProps } from './pages/profile';

registerComponent('TextInput', TextInput);
registerComponent('BaseForm', BaseForm);
registerComponent('ChatItem', ChatItem);
registerComponent('ProfileInput', ProfileInput);

const submitFn: (event: Event) => void = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const res: Record<string, unknown> = {};

  [...formData.entries()].forEach(([key, value]) => {
    res[key] = value;
  });
  console.log(res);

  setTimeout(() => { window.location.assign('/chat'); }, 2000);
};
const focusinFn: (event: Event) => void = (event) => {
  const el = event.target as Element;
  if (el.tagName === 'INPUT') {
    event.preventDefault();
  }
};
const focusoutFn: (event: Event) => void = (event) => {
  const el = event.target as Element;
  if (el.tagName === 'INPUT') {
    event.preventDefault();
  }
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
  '/profile': () => new Profile({ inputs } as ProfileProps),
  '/registration': () => new Auth({
    form: new BaseForm({
      events: {
        submit: submitFn,
        focusin: focusinFn,
        focusout: focusoutFn,
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
          events: {},
        },
        {
          type: 'text',
          placeholder: 'Логин',
          name: 'login',
          events: {},
        },
        {
          type: 'text',
          placeholder: 'Имя',
          name: 'first_name',
          events: {},
        },
        {
          type: 'text',
          placeholder: 'Фамилия',
          name: 'second_name',
          events: {},
        },
        {
          type: 'text',
          placeholder: 'Телефон',
          name: 'phone',
          events: {},
        },
        {
          type: 'password',
          placeholder: 'Пароль',
          name: 'password',
          events: {},
        },
        {
          type: 'password',
          placeholder: 'Пароль (еще раз)',
          name: 'password_confirmation',
          events: {},
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
        focusin: focusinFn,
        focusout: focusoutFn,
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
          events: {},
        },
        {
          type: 'password',
          placeholder: 'Пароль',
          name: 'password',
          events: {},
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
