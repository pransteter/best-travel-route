import {
  TravelQuotationRoute,
} from '../routes/TravelQuotationRoute.js';
import {
  TravelRouteRoute,
} from '../routes/TravelRouteRoute.js';
import {Route} from '../routes/Route.js';

/**
 * Router class
 * Used to set endpoints and respective controllers
 */
export class Router {
  /**
   * apply method (public)
   * Used to apply routes
   * @param {Request} req
   * @param {Response} res
   */
  applyRoutes(req, res) {
    this.add(new TravelQuotationRoute(req.url, req.method), req, res);
    this.add(new TravelRouteRoute(req.url, req.method), req, res);

    this.finish(res);
  }

  /**
   * finish method (private)
   * Used to finish an API response
   * @param {Response} res
   */
  finish(res) {
    if (!res.writableFinished) {
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.write('Route not found.');
    }

    res.end();
  }

  /**
   * add method (private)
   * Used to add and apply a new route instance
   * @param {Route} route
   * @param {Request} req
   * @param {Response} res
   */
  add(route, req, res) {
    if (res.writableEnded) {
      return;
    }

    if (!(route instanceof Route)) {
      return;
    }

    route.apply(req, res);
  }
}
