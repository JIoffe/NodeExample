/*
  Bootstrap the web server with dependencies
  Separating it like this makes it easier to test directly.
*/
import express from 'express';
import bodyParser from 'body-parser';

import * as routes from './routers/index.js';
import { tokenValidator } from './middleware/token-validator.js';

const { indexRouter, inventoryApiRouter, oauthRouter } = routes;

const server = (oauthService, inventoryService) => {
  const app = express();
  app.set("views", "views");
  app.set("view engine", "pug");

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static('public'));

  app.use(tokenValidator('/api', oauthService));

  app.use('/', indexRouter());
  app.use('/api/inventory', inventoryApiRouter(inventoryService));
  app.use('/oauth', oauthRouter(oauthService));

  app.listen(process.env.PORT, () => {
      console.log(`Web Server running on port ${process.env.PORT}`);
    });
  
  return app;
}

export default server;