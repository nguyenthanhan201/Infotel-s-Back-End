import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from 'src/common/strategies/google.strategy';
import { jwtConstants } from '../common/constants';
import { FirebaseAuthStrategy } from '../common/strategies/firebase-auth.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [FirebaseAuthStrategy, GoogleStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
