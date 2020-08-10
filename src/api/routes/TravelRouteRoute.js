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
   */
  constructor(pathname, method) {
    super(pathname, method);
    this.expectedPathname = '/travel-route';
  }

  /**
   * apply method
   * Used to apply a behaviour by rest path and method.
   * @param {Request} req
   * @param {Response} res
   */
  apply(req, res) {
    if (this.method === 'POST' && this.pathname === this.expectedPathname) {
      new TravelRouteController().insertNewRoute(req, res);
      return;
    }
  }
}
