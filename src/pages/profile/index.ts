import template from './profile.hbs';
import { Component } from '../../utils/Component';
import {Link} from "../../components/link";
import {Routes} from "../../utils/Router";
import {withStore} from "../../hocs/withStore";

export type ProfileProps = {
  isActiveForm: boolean;
};

export class Profile extends Component {

  init() {
    this.children.logout = new Link({
      text: 'Выйти',
      styles: 'red',
      url: Routes.Logout
    })
    this.children.changeProfile = new Link({
      text: 'Изменить данные',
      styles: '',
      url: Routes.ProfilEdit
    })
    this.children.changePassword = new Link({
      text: 'Изменить пароль',
      styles: '',
      url: Routes.PasswordEdit
    })
  }

  render(): DocumentFragment {
    const block = this.compile(template, { ...this.props, children: this.children });
    return block;
  }
}
const withUser = withStore((state) => ({user: { ...state.user} }))
export const ProfilePage = withUser(Profile);
