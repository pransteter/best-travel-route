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
    return this.adapter
        .select('*')
        .from('travel-routes')
        .fetchAll();
  }
}
