import { expect } from 'chai';
import sinon from 'sinon';
import { router } from './Router';
import { Component } from './Component';

describe('Router', () => {
  const originalForward = window.history.forward;
  const originalBack = window.history.back;
  const getContentFake = sinon.fake.returns(document.createElement('div'));
  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as typeof Component;

  beforeEach(() => {
    router.reset();
    window.history.forward = sinon.fake();
    window.history.back = sinon.fake();
  });

  after(() => {
    window.history.forward = originalForward;
    window.history.back = originalBack;
  });

  it('use() возвращает экземляр Router', () => {
    const result = router.use('/', BlockMock);

    expect(result).to.eq(router);
  });

  it('отрисовывает страницу при router.start()', () => {
    router
      .use('/', BlockMock)
      .start();

    expect(getContentFake.callCount).to.eq(1);
  });

  it('forward вызывает window.history.forward', () => {
    router.forward();
    expect((window.history.forward as any).callCount).to.eq(1);
  });

  it('back вызывает window.history.back', () => {
    router.back();
    expect((window.history.back as any).callCount).to.eq(1);
  });
});
