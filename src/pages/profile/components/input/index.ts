import template from './input.hbs';
import Component from '../../../../utils/Component';

export default class ProfileInput extends Component {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
