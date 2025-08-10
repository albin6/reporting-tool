import jwt, { SignOptions, VerifyOptions, JwtPayload } from 'jsonwebtoken';

export class JwtHandler {
    private secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    sign(payload: object, options?: SignOptions): string {
        return jwt.sign(payload, this.secret, options);
    }

    verify(token: string, options?: VerifyOptions): JwtPayload | string | null {
        try {
            return jwt.verify(token, this.secret, options);
        } catch {
            return null;
        }
    }

    decode(token: string): JwtPayload | string | null {
        return jwt.decode(token);
    }
}
