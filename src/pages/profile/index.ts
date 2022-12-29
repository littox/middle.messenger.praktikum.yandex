import template from './profile.hbs';
import { Component } from '../../utils/Component';
import {Link} from "../../components/link";
import {Routes} from "../../utils/Router";

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
  }

  onFormActiveToggle(e: Event): void {
    e.preventDefault();
    this.props.isActiveForm = true;
  }

  render(): DocumentFragment {
    const block = this.compile(template, { ...this.props, children: this.children });
    const formActiveSwitch = block.querySelector('#js-toggle-form');
    formActiveSwitch?.addEventListener('click', this.onFormActiveToggle.bind(this));
    return block;
  }
}

// const withUser = withStore((state) => ({ ...state.user }))
//
// export const ProfilePage = withUser(Profile);
