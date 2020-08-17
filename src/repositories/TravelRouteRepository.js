/**
 * TravelRouteRepository class
 */
export class TravelRouteRepository {
  /**
   * constructor method
   * @param {Adapter} adapter
   */
  constructor(adapter) {
    this.adapter = adapter;
  }

  /**
   * getAllRoutes method
   * @return {array}
   */
  getAllRoutes() {
    const rawRoutes = this.adapter
        .from('travel-routes.csv')
        .fetchAll();

    return rawRoutes.map(this.buildRoute);
  }

  /**
   * buildRoute method
   * @param {string} rawRoute
   * @return {object}
   */
  buildRoute(rawRoute) {
    const routeValues = rawRoute.split(',');

    return {
      from: routeValues[0].trim(),
      to: routeValues[1].trim(),
      price: Number(routeValues[2].trim()),
    };
  }
}
