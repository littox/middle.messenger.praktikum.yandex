import template from './form.hbs';
import { Component } from '../../../../utils/Component';
import { ProfileInput } from '../input';
import {ValidationRuleNames} from "../../../../utils/Validator";
import {onBlur} from "../../../../utils/validateInput";
import {withStore} from "../../../../hocs/withStore";
import {User} from "../../../../api/AuthAPI";

export interface ProfileFormProps {
  user: User;
  events: Record<string, EventListener>;
  isActiveForm: boolean;
}

export class ProfileFormBase extends Component<ProfileFormProps> {
  constructor(propsAndChildren: ProfileFormProps) {
    super(propsAndChildren);
    this.props.events = { submit: this.onSubmit };
  }

  protected init() {
    console.log(this.props)
    console.log(this.props.user)
    console.log(this.props.user.email)
    this.children.email = new ProfileInput(
      {
        type: 'email',
        placeholder: 'email@example.com',
        name: 'email',
        value: this.props.user?.email,
        disabled: !this.props.isActiveForm,
        validation: ValidationRuleNames.email,
        errors: [],
        events: {
          focusout: onBlur,
        },
      });
    this.children.login = new ProfileInput(
      {
        type: 'text',
        placeholder: 'Логин',
        name: 'login',
        value: this.props.user?.login,
        validation: ValidationRuleNames.login,
        disabled: !this.props.isActiveForm,
        errors: [],
        events: {
          focusout: onBlur,
        },
      });
    this.children.firstName = new ProfileInput(
      {
        type: 'text',
        placeholder: 'Имя',
        name: 'first_name',
        value: this.props.user?.first_name,
        validation: ValidationRuleNames.login,
        disabled: !this.props.isActiveForm,
        errors: [],
        events: {
          focusout: onBlur,
        },
      });
    this.children.secondName = new ProfileInput(
      {
        type: 'text',
        placeholder: 'Фамилия',
        name: 'second_name',
        value: this.props.user?.second_name,
        validation: ValidationRuleNames.login,
        disabled: !this.props.isActiveForm,
        errors: [],
        events: {
          focusout: onBlur,
        },
      });
    this.children.displayName = new ProfileInput(
      {
        type: 'text',
        placeholder: 'Имя в чате',
        name: 'display_name',
        value: this.props.user?.display_name,
        validation: ValidationRuleNames.login,
        disabled: !this.props.isActiveForm,
        errors: [],
        events: {
          focusout: onBlur,
        },
      });
    this.children.phone = new ProfileInput(
      {
        type: 'text',
        placeholder: 'Телефон',
        name: 'display_name',
        value: this.props.user?.phone,
        validation: ValidationRuleNames.login,
        disabled: !this.props.isActiveForm,
        errors: [],
        events: {
          focusout: onBlur,
        },
      });

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

const withUser = withStore((state) => ({user: { ...state.user} }))

export const ProfileForm = withUser(ProfileFormBase);
