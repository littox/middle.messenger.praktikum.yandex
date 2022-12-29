enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Data = Record<string, string | number>;

type Options = {
  method: Methods;
  data?: Data;
  headers?: Record<string, string>;
  timeout?: number;
};
type OptsWithNoMethod = Omit<Options, 'method'>;

function queryStringify(data: Data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export class HTTPTransport {
  get<Response>(url: string, options: OptsWithNoMethod = {}):Promise<Response> {
    return this.request<Response>(
      options.data ? `${url}${queryStringify(options.data)}` : url,
      { ...options, method: Methods.GET },
      options.timeout,
    );
  }

  post<Response = void>(url: string, options: OptsWithNoMethod = {}):Promise<Response> {
    return this.request<Response>(url, { ...options, method: Methods.POST }, options.timeout);
  }

  put<Response = void>(url: string, options: OptsWithNoMethod = {}):Promise<Response> {
    return this.request<Response>(url, { ...options, method: Methods.PUT }, options.timeout);
  }

  delete<Response>(url: string, options: OptsWithNoMethod = {}):Promise<Response> {
    return this.request<Response>(url, { ...options, method: Methods.DELETE }, options.timeout);
  }

  // eslint-disable-next-line class-methods-use-this
  private request<Response = void>(url: string, options: Options, timeout = 5000): Promise<Response> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      const isGet = method === Methods.GET;
      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
