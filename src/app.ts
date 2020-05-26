import cors from 'cors';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import routes from './routes';

class App {
  app: express.Application;
  server: http.Server;
  io: io.Server;

  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);

    this.socket();
    this.middleware();
    this.routes();
  }

  socket() {
    this.io = io(this.server);
    this.io.on('connection', (socket) => {
      socket.on('chat message', (message) => {
        this.io.emit('chat message', message);
      });
      console.log(`Socket connected: ${socket.id}`);
    });
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
