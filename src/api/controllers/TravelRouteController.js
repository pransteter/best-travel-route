/**
 * TravelRouteController class
 */
export class TravelRouteController {
  /**
   * insertNewRoute method
   * Used to insert new travel routes
   * @param {Request} req
   * @param {Response} res
   */
  insertNewRoute(req, res) {
    res.statusCode = 204;
    res.end();
    return;
  }
}
