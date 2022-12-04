import TextInput from './components/text-input';
import Auth from './pages/auth';
import registerComponent from './utils/registerComponent';

registerComponent('TextInput', TextInput);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');
  const authPage = new Auth({
    action: '/',
    formTitle: 'Вход',
    submitLink: '/',
    submitText: 'Войти',
  });
  root.append(authPage.getContent());
});
