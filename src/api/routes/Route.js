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

  /**
   * apply method
   * Used to apply a behaviour by rest path and method.
   * @param {Request} req
   * @param {Response} res
   */
  apply(req, res) {
  }
}
