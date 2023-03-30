import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config/dist';
import { XRPLModule } from './modules/xrpl/xrpl.module';
import { IPFSModule } from './modules/ipfs/ipfs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
    }),
    AuthenticationModule,
    UsersModule,
    XRPLModule,
    IPFSModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
