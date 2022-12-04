import Handlebars from 'handlebars/dist/handlebars.runtime';
import ComponentType from './Component';

export default function registerComponent(name: string, Component: typeof ComponentType) {
  Handlebars.registerHelper(name, ({ hash, data }) => {
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