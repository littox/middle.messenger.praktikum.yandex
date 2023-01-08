import { Component } from '../utils/Component';
import store, { StoreEvents } from '../utils/Store';
import { isEqual } from '../utils/isEqual';
import { User } from '../api/data/User';
import { ChatInfo } from '../api/data/Chats';
import { MessageData } from '../api/data/MessageData';

interface State {
  user: User;
  chats: ChatInfo[];
  messages: Record<number, MessageData[]>;
  selectedChat?: number;
  selectedChatUsers?: User[];
}

export function withStore<SP extends Record<string, any>>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Block: typeof Component<SP & P>) {
    return class WithStore extends Block {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());
        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          if (isEqual(previousState, stateProps)) {
            return;
          }
          previousState = stateProps;
          this.setProps({ ...stateProps });
        });
      }
    };
  };
}
