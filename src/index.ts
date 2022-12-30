import { TextInput } from './components/text-input';
import { Auth } from './pages/auth';
import { registerComponent } from './utils/registerComponent';
import { BaseForm } from './components/base-form';
import { Error, ErrorProps } from './components/error';
import { Component } from './utils/Component';
import { ChatItem } from './pages/chat/components/chat-item';
import { Chat, ChatProps } from './pages/chat';
import { chats } from './pages/chat/data/chats';
import { ProfileInput } from './components/input';
import {Profile, ProfilePage, ProfileProps} from './pages/profile';
import { ProfileForm } from './pages/profile-edit/components/form';
import {router, Routes} from "./utils/Router";
import {Registration} from "./pages/registration";
import {Logout} from "./pages/logout";
import AuthController from "./controllers/AuthController";
import {ProfileInfoItem} from "./pages/profile/components/info-item";
import {ProfileEdit} from "./pages/profile-edit";
import {ChangePasswordForm} from "./pages/password-edit/components/form";
import {PasswordEdit} from "./pages/password-edit";
import {AvatarForm} from "./components/avatar-form";
import {PrevLink} from "./components/prev-link";

registerComponent('TextInput', TextInput);
registerComponent('ProfileInfoItem', ProfileInfoItem);
registerComponent('BaseForm', BaseForm);
registerComponent('ChatItem', ChatItem);
registerComponent('ProfileInput', ProfileInput);
registerComponent('ProfileForm', ProfileForm);
registerComponent('ChangePasswordForm', ChangePasswordForm);
registerComponent('AvatarForm', AvatarForm);
registerComponent('PrevLink', PrevLink);

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
};

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Index, Auth)
    .use(Routes.Logout, Logout)
    .use(Routes.Registration, Registration)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.ProfilEdit, ProfileEdit)
    .use(Routes.PasswordEdit, PasswordEdit)
    .use(Routes.Chat, Chat)
    .use(Routes.NotFound, Error)
    .use(Routes.Error, Error)

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
      router.go(Routes.Profile)
    }
  } catch (e) {
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Index);
    }
  }

});
