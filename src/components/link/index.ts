import { Component } from '../../utils/Component';
import template from './link.hbs';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';

export interface LinkProps extends PropsWithRouter {
  url: string;
  text: string;
  styles?: string;
  events?: {
    click: (e: Event) => void;
  };
}

export class BaseLink extends Component<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (event) => this.navigate(event),
      },
    });
  }

  navigate(event: Event) {
    event.preventDefault();
    this.props.router.go(this.props.url);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const Link = withRouter(BaseLink);
