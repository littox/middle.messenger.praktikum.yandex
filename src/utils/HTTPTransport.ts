enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Data = Record<string, string | number>;

type Options = {
  method: METHODS;
  data?: Data;
  headers?: unknown;
};

function queryStringify(data: Data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export default class HTTPTransport {
  get(url: string, options: Record<string, any> = {}):Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  }

  post(url: string, options: Record<string, any> = {}):Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  }

  put(url: string, options: Record<string, any> = {}):Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  delete(url: string, options: Record<string, any> = {}):Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  // eslint-disable-next-line class-methods-use-this
  private request(url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        // @ts-ignore
        xhr.send(data);
      }
    });
  }
}
