const express = require('express');

class Server {
  constructor() {
    this.app  = express();
    this.PORT = process.env.PORT;

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    // Public Directory
    this.app.use( express.static('public') );
  }

  routes() {
    this.app.get("/api", (request, response) => {
      response.send("Express Running");
    });
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log('Server running on port:', this.PORT);
    });
  }
}

module.exports = Server;