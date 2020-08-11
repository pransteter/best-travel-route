import {createServer as _createServer} from 'http';

/**
 * Server class
 */
export class Server {
  /**
   * constructor method
   * @param {Router} router
   */
  constructor(router) {
    this.httpServer = null;
    this.router = router;
  }

  /**
   * start method
   */
  start() {
    const server = this.createServer();

    server.listen('4001', () => {
      console.log('Api Server is running at port 4001.');
    });
  }

  /**
   * createServer method
   * @return {net.Server}
   */
  createServer() {
    return _createServer((req, res) => {
      this.router.applyRoutes(req, res);
    });
  }
}
