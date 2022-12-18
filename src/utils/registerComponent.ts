import Handlebars from 'handlebars/dist/handlebars.runtime';
import { Component as ComponentType } from './Component';

export function registerComponent(name: string, Component: typeof ComponentType) {
  Handlebars.registerHelper(name, ({ hash, data }: Record<any, any>) => {
    if (!data.root.children) {
      // eslint-disable-next-line no-param-reassign
      data.root.children = {};
    }
    const component = new Component(hash);

    // eslint-disable-next-line no-param-reassign
    data.root.children[component.id] = component;

    return `<div data-id="${component.id}"></div>`;
  });
}
