import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookies(request);
    const refresh_token = this.extractRefreshTokenFromCookies(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch (err) {
      // console.error(err);
      // check token expiration
      if (err.name === 'TokenExpiredError') {
        const payload = await this.jwtService.verifyAsync(refresh_token, {
          secret: jwtConstants.secret,
        });

        const access_token = await this.jwtService.sign(
          {
            email: payload.email,
          },
          {
            expiresIn: '10s',
          },
        );

        request.header('Authorization', `Bearer ${access_token}`);
        request['user'] = payload;
      } else {
        throw new UnauthorizedException();
      }
    }
    return true;
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    // const [type, token] = request.headers.authorization?.split(' ') ?? [];
    const [type, token] = request.cookies['Authorization'].split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractRefreshTokenFromCookies(request: Request): string | undefined {
    const [type, token] = request.cookies['Refresh-Token']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async verifyToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
