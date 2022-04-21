const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const dbConnection = require("../database/config");

class Server {
  constructor() {
    this.app  = express();
    this.PORT = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      uploads: '/api/uploads',
    };

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

    // File Uploads
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.users, require('../routes/users.routes'));
    this.app.use(this.paths.categories, require('../routes/categories.routes'));
    this.app.use(this.paths.products, require('../routes/products.routes'));
    this.app.use(this.paths.search, require('../routes/search.routes'));
    this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log('Server running on port:', this.PORT);
    });
  }
}

module.exports = Server;