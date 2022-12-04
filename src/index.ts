import TextInput from './components/text-input';
import Auth, { AuthProps } from './pages/auth';
import registerComponent from './utils/registerComponent';
import BaseForm, { BaseFormProps } from './components/base-form';
import Error, { ErrorProps } from './components/error';
import Component from './utils/Component';

registerComponent('TextInput', TextInput);
registerComponent('BaseForm', BaseForm);

const PAGES = {
  '/404': () => new Error({
    code: '404',
    text: 'Не туда попали',
  } as ErrorProps),
  '/500': () => new Error({
    code: '500',
    text: 'Мы уже фиксим',
  } as ErrorProps),
  '/auth': '/',
  '/': () => new Auth({
    form: new BaseForm({
      events: {
        submit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const res = {};

          // eslint-disable-next-line no-restricted-syntax
          for (const [firstName, surname] of formData.entries()) {
            res[firstName] = surname;
          }

          console.log(res);
        },
        focusin: (event) => {
          if (event.target.tagName === 'INPUT') {
            event.preventDefault();
            console.log(event.target.value);
          }
        },
        focusout: (event) => {
          if (event.target.tagName === 'INPUT') {
            event.preventDefault();
            console.log(event.target.value);
          }
        },
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
        url: '#',
        text: 'Зарегистрироваться',
      },
    } as BaseFormProps),
  } as AuthProps),
};

function renderPage(name): void {
  const root = document.getElementById('app');
  if (!PAGES[name]) {
    window.location = '/404';
  }
  const component: () => Component = PAGES[name];

  root.append(component().getContent());
}

window.renderPage = renderPage;

document.addEventListener('DOMContentLoaded', () => {
  renderPage(window.location.pathname);
});
