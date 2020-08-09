import {Server} from './server/Server.js';
import {Router} from './server/Router.js';

const server = new Server(new Router);

server.start();
