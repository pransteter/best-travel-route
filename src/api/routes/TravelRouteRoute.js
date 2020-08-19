import {Route} from './Route.js';
import {TravelRouteController} from '../controllers/TravelRouteController.js';

/**
 * TravelRouteRoute class
 */
export class TravelRouteRoute extends Route {
  /**
   * constructor method
   * @param {string} pathname
   * @param {string} method
   * @param {json} body
   */
  constructor(pathname, method) {
    super(pathname, method);
    this.expectedPathname = '/travel-route';
  }

  /**
   * apply method
   * @param {Request} req
   * @param {Response} res
   * @param {json} body
   */
  apply(req, res, body) {
    if (this.method === 'POST' && this.pathname === this.expectedPathname) {
      new TravelRouteController().insertNewRoute(req, res, body);
      return;
    }
  }
}
