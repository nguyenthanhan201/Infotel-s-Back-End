import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as FirebaseAuth from 'firebase/auth';
import { BE_URL } from 'src/common/constants';
import { authentication } from 'src/config/firebase.config';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async google() {}

  @UseGuards(AuthGuard('google'))
  @Get('auth/google/callback')
  async googleCallback(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { access_token, refresh_token } = await this.signInWithGoogle(
      req.user.emails[0].value,
    );

    this.authService.setCookie(res, { access_token, refresh_token });

    // res.status(200);
    // return res.json(req.user);
    return res.redirect(BE_URL + 'user/profile');
  }

  @Post('auth/sign-up')
  async signUp(@Body() { email, password }: SignUpDto) {
    const userCredential = await FirebaseAuth.createUserWithEmailAndPassword(
      authentication,
      email,
      password,
    );

    return { idToken: await userCredential.user.getIdToken() };
  }

  @Post('auth/sign-in')
  async signIn(
    @Body() { email, password }: SignInDto,
    @Res({ passthrough: true }) res,
  ) {
    const userCredential = await FirebaseAuth.signInWithEmailAndPassword(
      authentication,
      email,
      password,
    );

    const payload = { email: userCredential.user.email };

    const access_token = this.authService.generateToken({
      payload,
      options: { expiresIn: '10s' },
    });
    const refresh_token = this.authService.generateToken({
      payload,
      options: { expiresIn: '7d' },
    });

    this.authService.setCookie(res, { access_token, refresh_token });

    return {
      access_token,
      refresh_token,
    };
  }

  async signInWithGoogle(email: string) {
    const payload = { email };

    const access_token = this.jwtService.sign(payload, {
      // expiresIn: '1h',
      expiresIn: '10s',
    });
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      access_token,
      refresh_token,
    };
  }
}
