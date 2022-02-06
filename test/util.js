import jwt from 'jsonwebtoken';

import server from '../server.js';
import { InventoryService, OAuthService, UserAccountService } from '../services/index.js';

let app = null;

export function bootstrapTestEnvironment(){
    process.env.PORT = 8080;
    process.env.NODE_ENV = 'test';
}

export function getTestServer(){
    if(app){
        return app;
    }

    const userAccountService = new UserAccountService();
    const inventoryService = new InventoryService();
    const oauthService = new OAuthService(userAccountService);

    app = server(oauthService, inventoryService);
    return app;
}

export function generateTestToken(){
    process.env.JWT_KEY = '12345TEST';

    const access_token = jwt.sign({client_id: '12345'},
        process.env.JWT_KEY,
        {
            expiresIn: '2h',
        }
    );

    return access_token;
}