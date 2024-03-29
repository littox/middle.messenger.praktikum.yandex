import { nanoid } from 'nanoid';
import { EventBus } from './EventBus';

export class Component<T extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(6);

  public children: Record<string, Component>;

  protected props: T;

  private _element: HTMLElement | null = null;

  private eventBus: () => EventBus;

  /** JSDoc
   * @param propsAndChildren
   *
   * @returns {void}
   */
  constructor(propsAndChildren: T) {
    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    const eventBus = new EventBus();

    this.props = this.makePropsProxy(props);

    this.eventBus = () => eventBus;

    this.registerEvents();
    this.eventBus().emit(Component.EVENTS.INIT);
  }

  protected init() {
  }

  private _init() {
    this.init();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  componentDidUpdate(): boolean {
    return true;
  }

  setProps = (nextProps: Record<string, any>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  compile(template: (props: any) => string, props: any) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([name, component]) => {
      propsAndStubs[name] = `<div data-id="${component.id}"></div>`;
    });

    const fragment = document.createElement('template');

    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      if (!stub) {
        return;
      }
      stub.replaceWith(child.getContent()!);
    });
    return fragment.content;
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this._element;
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidMount() {
  }

  private registerEvents() {
    this.eventBus().on(Component.EVENTS.INIT, this._init.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  private _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }
    this._render();
  }

  protected addCustomEvents() {}

  private _render() {
    const block = this.render();
    const newEl = block.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newEl);
    }
    this._element = newEl;
    this._addEvents();
  }

  private _removeEvents(): void {
    const { events = {} } = this.props as T & { events: Record<string, () => void> };

    if (!events || !this._element) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private _getChildren(propsAndChildren?: T) {
    const children: Record<string, Component> = {};
    const props: Record<string, any> = {};

    if (propsAndChildren) {
      Object.entries(propsAndChildren).forEach(([key, value]) => {
        if (value instanceof Component) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      });
    }

    return { children, props: props as T };
  }

  private _addEvents(): void {
    const { events = {} } = this.props as T & { events: Record<string, () => void> };

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([eventName, listener]) => {
      this._element?.addEventListener(eventName, listener);
    });
    this.addCustomEvents();
  }

  private makePropsProxy(props: T): T {
    const self = this;
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldProps = { ...target };
        // eslint-disable-next-line no-param-reassign
        target[prop as keyof T] = value;

        self.eventBus().emit(Component.EVENTS.FLOW_CDU, { ...oldProps }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }
}
