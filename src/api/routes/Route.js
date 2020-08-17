/**
 * Route class
 */
export class Route {
  /**
   * constructor method
   * @param {string} rawPathname
   * @param {string} method
   */
  constructor(rawPathname, method) {
    this.pathname = '';
    this.urlParams = null;
    this.method = method;
    this.processPathname(rawPathname);
  }

  /**
   * apply method
   * @param {Request} req
   * @param {Response} res
   */
  apply(req, res) {
  }

  /**
   * treatPathname method
   * @param {string} rawPathname
   */
  processPathname(rawPathname) {
    const splitedPathname = rawPathname.split('?');

    this.pathname = splitedPathname[0];

    if (splitedPathname[1]) {
      this.urlParams = new URLSearchParams(splitedPathname[1]);
    }
  }
}
