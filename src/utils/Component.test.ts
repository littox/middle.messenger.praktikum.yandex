// eslint-disable-next-line max-classes-per-file
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { expect } from 'chai';
import type { Component } from './Component';

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

const { default: ComponentBlock } = proxyquire('./Component', {
  './EventBus': {
    EventBus: class {
      emit = eventBusMock.emit;

      on = eventBusMock.on;
    },
  },
}) as { default: typeof Component };

describe('Component', () => {
  class ComponentMock extends ComponentBlock {}
  it('вызывается Component.init() при инициализации компонента', () => {
    // eslint-disable-next-line no-new
    new ComponentMock({});
    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });
});
