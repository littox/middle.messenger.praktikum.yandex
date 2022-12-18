import template from './form.hbs';
import { Component } from '../../../../utils/Component';
import { ProfileInput, ProfileInputProps } from '../input';
import { inputs } from '../../data/inputs';

export type ProfileFormProps = {
  events: Record<string, EventListener>
  inputs: ProfileInputProps[];
  isActiveForm: boolean;
};

export class ProfileForm extends Component {
  constructor(propsAndChildren: any) {
    super({
      ...propsAndChildren,
      inputs,
    });
    this.props.events = { submit: this.onSubmit };
  }

  //
  onSubmit(e: Event): void {
    e.preventDefault();
    let isValid: boolean = true;
    const isProfileInputs = (component: Component): component is ProfileInput => component instanceof ProfileInput;
    const profileInputs: ProfileInput[] = Object.values(this.children).filter(isProfileInputs);
    profileInputs.forEach((component) => {
      isValid = component.isValid() && isValid;
    });
    const formData = new FormData(e.target as HTMLFormElement);
    const res: Record<string, unknown> = {};
    [...formData.entries()].forEach(([key, value]) => {
      res[key] = value;
    });
    console.log(res);
    setTimeout(() => {
      window.location.assign('/profile');
    }, 2000);
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}
