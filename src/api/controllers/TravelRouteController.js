import {TravelRouteRepository}
  from '../../repositories/TravelRouteRepository.js';
import {CsvAdapter} from '../../adapters/CsvAdapter.js';

/**
 * TravelRouteController class
 */
export class TravelRouteController {
  /**
   * insertNewRoute method
   * @param {Request} req
   * @param {Response} res
   * @param {json} body
   */
  insertNewRoute(req, res, body) {
    const result = this.validRoute(body);

    if (result.isValid !== true) {
      res.statusCode = 404;
      res.end(JSON.stringify());
    }

    const repository = new TravelRouteRepository(
        new CsvAdapter('database-files/'),
    );
    repository.save(result.route);

    res.statusCode = 204;
    res.end();
    return;
  }

  /**
   * validRoute method
   * @param {string} rawRoute
   * @return {object}
   */
  validRoute(rawRoute) {
    try {
      const route = JSON.parse(rawRoute);

      if (!route.from) {
        throw new Error('Route needs to have field: from');
      }

      if (!route.to) {
        throw new Error('Route needs to have field: to');
      }

      if (!route.price) {
        throw new Error('Route needs to have field: price');
      }

      return {isValid: true, route};
    } catch (err) {
      return {isValid: false, errorMessage: err.message};
    }
  }
}
