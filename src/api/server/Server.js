import {createServer as _createServer} from 'http';

/**
 * Server class
 * Used to provide an API Server;
 */
export class Server {
  /**
   * constructor method
   * Used to initialize scope properties.
   * @param {Router} router
   */
  constructor(router) {
    this.httpServer = null;
    this.router = router;
  }

  /**
   * start method
   * Used to start the API Server.
   */
  start() {
    const server = this.createServer();

    server.listen('4001', () => {
      console.log('Api Server is running at port 4001.');
    });
  }

  /**
   * createServer method
   * Used to create a http server.
   * @return {net.Server}
   */
  createServer() {
    return _createServer(this.router.apply);
  }
}
