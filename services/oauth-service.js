import jwt from 'jsonwebtoken';

export class OAuthService{
    constructor(userAccountService){
        this.userAccountService = userAccountService;
    }

    async grantToken({ grant_type, client_id, ...args }){
        if(!grant_type){
            return { error: 'Missing grant_type' };
        }

        if(!client_id){
            return { error: 'Missing client_id'};
        }

        if(!await this.validateClientId(client_id)){
            return {
                error: `Unsupported client_id: ${client_id}`
            }
        }

        switch(grant_type){
            case 'password':
                return await this.grantTokenWithPassword({client_id, ...args})
            default:
                return {
                    error: `Unsupported grant_type: ${grant_type}`
                }
        }
    }

    async grantTokenWithPassword({username, password, client_id}){
        if(!username?.length || !password?.length){
            return { error: 'Requires username and password'}
        }

        const userLoginDetails = await this.userAccountService.loginUser(username, password);

        if(!userLoginDetails){
            return {
                error: 'Invalid login credentials'
            }
        }

        const access_token = jwt.sign({client_id, ...userLoginDetails},
            process.env.JWT_KEY,
            {
                expiresIn: '2h',
            }
        );

        return {
            access_token,
            expires_in: 60*60*2 // 2 hours
        };
    }

    async validateToken(token){
        if(!token)
            return null;
        
        return jwt.verify(token, process.env.JWT_KEY);
    }

    async validateClientId(clientId){
        return clientId === '12345';
    }
}