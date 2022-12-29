import {Component} from "../utils/Component";
import store, {StoreEvents} from "../utils/Store";
import {isEqual} from "../utils/isEqual";

export function withStore(mapStateToProps: (state: Record<string, any>) => any) {

  return function wrap(Block: typeof Component<any>){
    let previousState: any;


    type Props = typeof Block extends typeof Component<infer P extends Record<string, unknown>> ? P : any;
    return class WithStore extends Block {

      constructor(props: Props) {
        previousState = mapStateToProps(store.getState());
        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          if (isEqual(previousState, stateProps)) {
            return;
          }
          previousState = stateProps;
          console.log('setPropsToStore');
          this.setProps({ ...stateProps });
        });
      }
    }

  }

}
