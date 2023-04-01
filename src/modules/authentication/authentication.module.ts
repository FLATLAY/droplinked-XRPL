import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { XRPLModule } from 'src/modules/xrpl/xrpl.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { OfflineStrategy } from './strategies/offline.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24 H' },
      }),
    }),
    UsersModule,
    XRPLModule,
  ],
  providers: [AuthenticationService, JwtStrategy, OfflineStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
