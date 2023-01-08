import template from './avatar-form.hbs';
import { Component } from '../../utils/Component';
import { withStore } from '../../hocs/withStore';
import { User } from '../../api/data/User';
import ProfileController from '../../controllers/ProfileController';

export interface AvatarFormProps {
  user: User;
  events: Record<string, EventListener>;
}
export class AvatarFormBase extends Component<AvatarFormProps> {
  constructor(propsAndChildren: AvatarFormProps) {
    super(propsAndChildren);
    this.props.events = { change: this.onChange };
  }

  onChange(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    ProfileController.updateAvatar(formData);
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}
const withUser = withStore((state) => ({ user: { ...state.user } }));

export const AvatarForm = withUser(AvatarFormBase);
