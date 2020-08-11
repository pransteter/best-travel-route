/**
 * Route class
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
   * @param {Request} req
   * @param {Response} res
   */
  apply(req, res) {
  }
}
