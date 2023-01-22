import { expect } from 'chai';
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { nanoid } from 'nanoid';
import { HTTPTransport } from './HTTPTransport';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  let id: string;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTPTransport('/chats');
    id = nanoid(5);
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('.get() посылает GET запрос', () => {
    instance.get(`/users/${id}`);

    const [request] = requests;

    expect(request.method).to.eq('GET');
  });

  it('.post()  посылает POST запрос', () => {
    instance.post('/users/search', { data: { login: 'login' } });

    const [request] = requests;

    expect(request.method).to.eq('POST');
  });

  it('.put() посылает PUT запрос', () => {
    instance.put('/users/password', { data: { oldPassword: 'password', newPassword: 'password' } });

    const [request] = requests;

    expect(request.method).to.eq('PUT');
  });

  it('.delete() посылает DELETE запрос', () => {
    instance.delete('/', { data: { chatId: id } });

    const [request] = requests;

    expect(request.method).to.eq('DELETE');
  });
});
