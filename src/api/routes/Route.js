/**
 * Route class (abstract)
 */
export class Route {
  /**
   * constructor method
   * @param {string} pathname
   * @param {string} method
   */
  constructor(pathname, method) {
    this.pathname = pathname;
    this.method = method;
  }
}
