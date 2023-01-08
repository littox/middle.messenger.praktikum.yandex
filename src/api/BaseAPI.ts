import { HTTPTransport } from '../utils/HTTPTransport';

export default abstract class BaseAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(identifier?: string | number): Promise<unknown>;

  public abstract update?(identifier: string | number, data: unknown): Promise<unknown>;

  public abstract delete?(identifier: string | number): Promise<unknown>;
}
