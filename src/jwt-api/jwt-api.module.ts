import { Module } from '@nestjs/common';
import { JwtApiService } from './jwt-api.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/config';

@Module({
  imports: [
    JwtModule.register({
      secret: env.jwt_secret,
      signOptions: {
        expiresIn: env.jwt_expiration,
      },
    }),
  ],
  providers: [JwtApiService],
  exports: [JwtApiService],
})
export class JwtApiModule {}
