import template from './profile.hbs';
import { Component } from '../../utils/Component';

export type ProfileProps = {
  isActiveForm: boolean;
};

export class Profile extends Component {
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
