import template from './profile.hbs';
import { Component } from '../../utils/Component';

export type ProfileProps = {
  inputs: Record<string, any>[];
};

export class Profile extends Component {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}
