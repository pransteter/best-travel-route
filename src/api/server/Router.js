import {
  TravelQuotationRoute,
} from '../routes/TravelQuotationRoute.js';
import {
  TravelRouteRoute,
} from '../routes/TravelRouteRoute.js';
import {Route} from '../routes/Route.js';

/**
 * Router class
 */
export class Router {
  /**
   * apply method
   * @param {Request} req
   * @param {Response} res
   * @param {json} body
   */
  applyRoutes(req, res, body) {
    this.add(new TravelQuotationRoute(req.url, req.method), req, res, body);
    this.add(new TravelRouteRoute(req.url, req.method), req, res, body);

    this.finish(res);
  }

  /**
   * finish method
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
   * add method
   * @param {Route} route
   * @param {Request} req
   * @param {Response} res
   * @param {json} body
   */
  add(route, req, res, body) {
    if (res.writableEnded) {
      return;
    }

    if (!(route instanceof Route)) {
      return;
    }

    route.apply(req, res, body);
  }
}
