import template from './input.hbs';
import {Component} from "../../../../utils/Component";

export type ProfileInfoItemProps = {
  name: string;
  value?: string;
};

export class ProfileInfoItem extends Component {
  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
