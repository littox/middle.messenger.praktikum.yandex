import {Component} from '../../utils/Component';
import template from './prev-link.hbs';
import {PropsWithRouter, withRouter} from "../../hocs/withRouter";

interface PrevLinkProps extends PropsWithRouter{
  events?: {
    click: (e: Event) => void;
  };
}

class BaseLink extends Component<PrevLinkProps> {
  constructor(props: PrevLinkProps) {
    super({
      ...props,
      events: {
        click: (event) => this.back(event)
      },
    });
  }

  back(event: Event) {
    event.preventDefault();
    this.props.router.back();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const PrevLink = withRouter(BaseLink);
