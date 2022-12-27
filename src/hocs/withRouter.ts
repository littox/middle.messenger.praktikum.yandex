import {Component} from '../utils/Component';
import {router} from '../utils/Router';

export function withRouter(Block: typeof Component<any>) {
  type Props = typeof Block extends typeof Component<infer P extends Record<string, unknown>> ? P : any;

  return class WithRouter extends Block {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: router });
    }
  }
}

export interface PropsWithRouter {
  router: typeof router;
}
