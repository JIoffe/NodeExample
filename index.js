/*
    This is the entry point of our application.

    This is where we wire up dependencies and start the web server.
    Generally, entry point files should have very little business logic.
*/
import * as dotenv from 'dotenv';

import { InventoryService, OAuthService, UserAccountService } from './services/index.js';
import server from './server.js';

//This must be called to apply the .env parameters as environment variables
dotenv.config();

const userAccountService = new UserAccountService();
const inventoryService = new InventoryService();
const oauthService = new OAuthService(userAccountService);

server(oauthService, inventoryService);