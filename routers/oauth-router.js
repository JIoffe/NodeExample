import express from 'express';

const oauthRouter = (oauthService) => {
    const router = express.Router();

//     grant_type=password - The grant type for this flow is password
// username=USERNAME - The user's username as collected by the application
// password=PASSWORD - The user's password as collected by the application
// client_id=CLIENT_ID - The client ID you received when you first created the application

    router.post('/token', async (req, res) => {
        const tokenResponse = await oauthService.grantToken(req.body);

        res.writeHead(tokenResponse.error ? 400 : 200);
        res.end(JSON.stringify(tokenResponse));
    });

    return router;
}

export default oauthRouter;