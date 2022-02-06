export function tokenValidator(path, oauthService) {
    return async (req, res, next) => {
        if(req.path.indexOf(path) === 0){
            const { authorization } = req.headers;
            if(!authorization || authorization.indexOf('Bearer ') !== 0){
                res.writeHead(401);
                res.end('Authorization header is missing or malformed');
                return;
            }

            const token = authorization.replace('Bearer ', '');

            try{
                const jwt_payload = await oauthService.validateToken(token);
                req.jwt_payload = jwt_payload;
            }catch({message}){
                res.writeHead(401);
                res.end(message);
                return;
            }
        }
        next();
    }
}