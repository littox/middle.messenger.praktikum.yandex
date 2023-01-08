import { TextInput } from './components/text-input';
import { Auth } from './pages/auth';
import { registerComponent } from './utils/registerComponent';
import { BaseForm } from './components/base-form';
import { Error } from './components/error';
import { ChatItem } from './pages/chat/components/chat-item';
import { Chats } from './pages/chat';
import { ProfileInput } from './components/input';
import { ProfilePage } from './pages/profile';
import { ProfileForm } from './pages/profile-edit/components/form';
import { router, Routes } from './utils/Router';
import { Registration } from './pages/registration';
import { Logout } from './pages/logout';
import AuthController from './controllers/AuthController';
import { ProfileInfoItem } from './pages/profile/components/info-item';
import { ProfileEdit } from './pages/profile-edit';
import { ChangePasswordForm } from './pages/password-edit/components/form';
import { PasswordEdit } from './pages/password-edit';
import { AvatarForm } from './components/avatar-form';
import { PrevLink } from './components/prev-link';
import { Message } from './pages/chat/components/message';

registerComponent('TextInput', TextInput);
registerComponent('ProfileInfoItem', ProfileInfoItem);
registerComponent('BaseForm', BaseForm);
registerComponent('ChatItem', ChatItem);
registerComponent('ProfileInput', ProfileInput);
registerComponent('ProfileForm', ProfileForm);
registerComponent('ChangePasswordForm', ChangePasswordForm);
registerComponent('AvatarForm', AvatarForm);
registerComponent('PrevLink', PrevLink);
registerComponent('Message', Message);

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Index, Auth)
    .use(Routes.Logout, Logout)
    .use(Routes.Registration, Registration)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.ProfilEdit, ProfileEdit)
    .use(Routes.PasswordEdit, PasswordEdit)
    .use(Routes.Chat, Chats)
    .use(Routes.NotFound, Error)
    .use(Routes.Error, Error);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Registration:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();
    router.start();

    if (!isProtectedRoute) {
      router.go(Routes.Profile);
    }
  } catch (e) {
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Index);
    }
  }
});
