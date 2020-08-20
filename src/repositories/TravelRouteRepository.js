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
        .setTarget('travel-routes.csv')
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

  /**
   * save method
   * @param {object} route
   * @return {boolean}
   */
  save(route) {
    try {
      const rawRoute = `${route.from},${route.to},${route.price}`;

      this.adapter
          .setTarget('travel-routes.csv')
          .save(rawRoute);
      return true;
    } catch (err) {
      return false;
    }
  }
}
