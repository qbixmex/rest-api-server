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
      response.json({
        msg: "Get Api"
      });
    });
    this.app.patch("/api", (request, response) => {
      response.json({
        msg: "Patch Api"
      });
    });
    this.app.patch("/api", (request, response) => {
      response.json({
        msg: "Patch Api"
      });
    });
    this.app.post("/api", (request, response) => {
      response.json({
        msg: "Post Api"
      });
    });
    this.app.delete("/api", (request, response) => {
      response.json({
        msg: "Delete Api"
      });
    });
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log('Server running on port:', this.PORT);
    });
  }
}

module.exports = Server;