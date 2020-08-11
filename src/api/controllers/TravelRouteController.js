/**
 * TravelRouteController class
 */
export class TravelRouteController {
  /**
   * insertNewRoute method
   * @param {Request} req
   * @param {Response} res
   */
  insertNewRoute(req, res) {
    // use only repositories here

    res.statusCode = 204;
    res.end();
    return;
  }
}
