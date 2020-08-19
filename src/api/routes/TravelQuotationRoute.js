import {Route} from './Route.js';
import {
  TravelQuotationController,
} from '../controllers/TravelQuotationController.js';

/**
 * TravelQuotationRoute class
 */
export class TravelQuotationRoute extends Route {
  /**
   * constructor method
   * @param {string} pathname
   * @param {string} method
   */
  constructor(pathname, method) {
    super(pathname, method);
    this.expectedPathname = '/travel-quotation';
  }

  /**
   * apply method
   * @param {Request} req
   * @param {Response} res
   * @param {string} body
   */
  apply(req, res, body) {
    if (this.method === 'GET' && this.pathname === this.expectedPathname) {
      new TravelQuotationController().getBestQuotation(
          req,
          res,
          this.urlParams,
      );
      return;
    }
  }
}
