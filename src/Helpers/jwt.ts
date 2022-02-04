import jwt from 'jsonwebtoken';
import env from '../Config/env';

export default class Jwt {
    private payload: string | object;
    private secret: jwt.Secret;

    constructor(payload: string | object) {
        this.payload = payload;
        this.secret = env.secret as jwt.Secret;
    }

    public sign(): string {
        const token = jwt.sign(this.payload, this.secret);
        return token;
    }

    public decode(token: string): String | object {
        const status = jwt.verify(token, this.secret);
        return status;
    }
}