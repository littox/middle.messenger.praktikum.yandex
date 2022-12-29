import template from './profile.hbs';
import { Component } from '../../utils/Component';

export class ProfileEdit extends Component {

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}

// const withUser = withStore((state) => ({ ...state.user }))
//
// export const ProfilePage = withUser(Profile);
