const express = require('express');
const cors = require('cors');

const dbConnection = require("../database/config");

class Server {
  constructor() {
    this.app  = express();
    this.PORT = process.env.PORT;
    this.usersPath = '/api/users';

    // Connect to database
    this.databaseConnection();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async databaseConnection() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use( cors() );

    // Body Parse Reading
    this.app.use( express.json() );

    // Public Directory
    this.app.use( express.static('public') );
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/users.routes'));
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log('Server running on port:', this.PORT);
    });
  }
}

module.exports = Server;