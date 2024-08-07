import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async setCookie(
    res: Response,
    {
      access_token,
      refresh_token,
    }: {
      access_token: string;
      refresh_token: string;
    },
  ) {
    if (access_token) {
      res.cookie('Authorization', `Bearer ${access_token}`, {
        httpOnly: true,
        maxAge: 86400000, // 1 day
      });
    }

    if (refresh_token) {
      res.cookie('Refresh-Token', `Bearer ${refresh_token}`, {
        httpOnly: true,
        maxAge: 86400000, // 1 day
      });
    }
  }

  generateToken({
    payload,
    options,
  }: {
    payload: { email: string };
    options: JwtSignOptions;
  }) {
    return this.jwtService.sign(payload, options);
  }
}
