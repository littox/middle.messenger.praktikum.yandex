import template from './form.hbs';
import { Component } from '../../../../utils/Component';
import { ProfileInput } from '../../../../components/input';
import { ValidationRuleNames } from '../../../../utils/Validator';
import { withStore } from '../../../../hocs/withStore';
import { User, UserInfo } from '../../../../api/data/User';
import ProfileController from '../../../../controllers/ProfileController';

export interface ProfileFormProps {
  user: User;
  events: Record<string, EventListener>;
}

export class ProfileFormBase extends Component<ProfileFormProps> {
  constructor(propsAndChildren: ProfileFormProps) {
    super(propsAndChildren);
    this.props.events = { submit: (e:Event) => this.onSubmit(e) };
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
      ProfileController.updateProfile(res as UserInfo);
    }
  }

  protected init() {
    this.children.email = new ProfileInput(
      {
        type: 'email',
        placeholder: 'email@example.com',
        name: 'email',
        value: this.props.user?.email,
        validation: ValidationRuleNames.email,
        errors: [],
      },
    );
    this.children.login = new ProfileInput(
      {
        type: 'text',
        placeholder: 'Логин',
        name: 'login',
        value: this.props.user?.login,
        validation: ValidationRuleNames.login,
        errors: [],
      },
    );
    this.children.firstName = new ProfileInput(
      {
        type: 'text',
        placeholder: 'Имя',
        name: 'first_name',
        value: this.props.user?.first_name,
        validation: ValidationRuleNames.name,
        errors: [],
      },
    );
    this.children.secondName = new ProfileInput(
      {
        type: 'text',
        placeholder: 'Фамилия',
        name: 'second_name',
        value: this.props.user?.second_name,
        validation: ValidationRuleNames.name,
        errors: [],
      },
    );
    this.children.displayName = new ProfileInput(
      {
        type: 'text',
        placeholder: 'Имя в чате',
        name: 'display_name',
        value: this.props.user?.display_name,
        validation: ValidationRuleNames.name,
        errors: [],
      },
    );
    this.children.phone = new ProfileInput(
      {
        type: 'text',
        placeholder: 'Телефон',
        name: 'phone',
        value: this.props.user?.phone,
        validation: ValidationRuleNames.phone,
        errors: [],
      },
    );
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}

const withUser = withStore((state) => ({ user: { ...state.user } }));

export const ProfileForm = withUser(ProfileFormBase);
