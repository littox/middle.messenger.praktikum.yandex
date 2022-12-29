import template from './form.hbs';
import { Component } from '../../../../utils/Component';
import {ValidationRuleNames} from "../../../../utils/Validator";
import {onBlur} from "../../../../utils/validateInput";
import {UserPassword} from "../../../../api/data/User";
import ProfileController from "../../../../controllers/ProfileController";
import {ProfileInput} from "../../../../components/input";

export interface ChangePasswordFormProps {
  events: Record<string, EventListener>;
}

export class ChangePasswordForm extends Component<ChangePasswordFormProps> {
  constructor(propsAndChildren: ChangePasswordFormProps) {
    super(propsAndChildren);
    this.props.events = { submit: this.onSubmit };
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    let isValid: boolean = true;
    const isProfileInputs = (component: Component): component is ProfileInput => component instanceof ProfileInput;
    const profileInputs: ProfileInput[] = Object.values(this.children).filter(isProfileInputs);
    profileInputs.forEach((component) => {
      isValid = component.isValid() && isValid;
    });
    const formData = new FormData(e.target as HTMLFormElement);
    const res: Record<string, any> = {};
    [...formData.entries()].forEach(([key, value]) => {
      res[key] = value;
    });

    if (isValid) {
      ProfileController.updatePassword(res as UserPassword);
    }
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }

  protected init() {
    this.children.oldPassword = new ProfileInput(
      {
        type: 'password',
        placeholder: 'Старый пароль',
        name: 'oldPassword',
        validation: ValidationRuleNames.password,
        errors: [],
        events: {
          focusout: onBlur,
        },
      });
    this.children.newPassword = new ProfileInput(
      {
        type: 'password',
        placeholder: 'Новый пароль',
        name: 'newPassword',
        validation: ValidationRuleNames.password,
        errors: [],
        events: {
          focusout: onBlur,
        },
      });
    this.children.passwordConfirm = new ProfileInput(
      {
        type: 'password',
        placeholder: 'Повторите новый пароль',
        name: 'passwordConfirm',
        validation: ValidationRuleNames.password,
        errors: [],
        events: {
          focusout: onBlur,
        },
      });
  }
}
