/**
 * PossibilitiesAlgorithm (abstract)
 */
export class PossibilitiesAlgorithm {
  /**
   * constructor method
   */
  constructor() {
    this.routes = [];
    this.possibilities = {};
  }
  /**
   * setAllRoutes method
   * @param {array} routes
   */
  setAllRoutes(routes) {
    this.routes = routes;
  }

  /**
   * generatePossibilities method
   */
  generatePossibilities() {
    // needs to be implemented within children classes
  }

  /**
   * getPossibilities method
   * @return {object}
   */
  getPossibilities() {
    this.generatePossibilities();
    return this.possibilities;
  }
}
