import { Component } from '../../utils/Component';
import template from './logout.hbs';
import AuthController from "../../controllers/AuthController";

export class Logout extends Component {

  init() {
    AuthController.logout();
  }

  render(): DocumentFragment {
    return this.compile(template, { form: this.children.form });
  }
}
