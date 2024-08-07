import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as FirebaseAdmin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth';
import { Strategy } from 'passport-http-bearer';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User extends DecodedIdToken {}
  }
}

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  async validate(token: string): Promise<DecodedIdToken> {
    console.log('👌  token:', token);
    try {
      return await FirebaseAdmin.auth().verifyIdToken(token);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
