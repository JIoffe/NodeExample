import bcrypt from 'bcrypt';

const userDatabase = [
    {
        "id": "1",
        "username": "Bob",
        "email": "bob@aol.com",
        "challenge": "$2b$10$lYyB5Rr9t4xTezdfL7gVAu8tMPZIIoXMMH9LgoQkDllUAsASREl9u"
    }
]

export class UserAccountService{
    constructor(){

    }

    async loginUser(username, password){
        const {challenge, ...userDetails} = userDatabase.find(user => user.username === username);

        if(challenge && await bcrypt.compare(password, challenge)){
            console.log('User %s has logged in', username);
            return userDetails;
        }

        return null;
    }
}

export const userAccountService = new UserAccountService();