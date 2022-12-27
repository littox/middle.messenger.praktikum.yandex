import { TextInput } from './components/text-input';
import { Auth } from './pages/auth';
import { registerComponent } from './utils/registerComponent';
import { BaseForm } from './components/base-form';
import { Error, ErrorProps } from './components/error';
import { Component } from './utils/Component';
import { ChatItem } from './pages/chat/components/chat-item';
import { Chat, ChatProps } from './pages/chat';
import { chats } from './pages/chat/data/chats';
import { ProfileInput } from './pages/profile/components/input';
import { Profile, ProfileProps } from './pages/profile';
import { ProfileForm } from './pages/profile/components/form';
import {router, Routes} from "./utils/Router";
import {Registration} from "./pages/registration";

registerComponent('TextInput', TextInput);
registerComponent('BaseForm', BaseForm);
registerComponent('ChatItem', ChatItem);
registerComponent('ProfileInput', ProfileInput);
registerComponent('ProfileForm', ProfileForm);

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
    .use(Routes.Registration, Registration)
    .use(Routes.Profile, Profile)
    .use(Routes.Chat, Chat)
    .use(Routes.NotFound, Error)
    .use(Routes.Error, Error)

  router.start();

});
