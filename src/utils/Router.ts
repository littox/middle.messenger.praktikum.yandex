import { Component } from './Component';
import { NotFoundException } from './Exceptions';
import { Route } from './Route';

export enum Routes {
  NotFound = '/404',
  Error = '/500',
  Chat = '/messenger',
  Profile = '/settings',
  ProfilEdit = '/settings-edit',
  PasswordEdit = '/settings-edit-password',
  Registration = '/sign-up',
  Logout = '/logout',
  Index = '/',
}

class Router {
  private static __instance: Router;

  private routes: Route[] = [];

  private currentRoute: Route | null = null;

  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Component) {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      throw new NotFoundException(`${pathname} page not found`);
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
export const router = new Router('#app');
