import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/users.service';
import mongoose from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { id: string }) {
    const user = await this.usersService.getUser({
      _id: new mongoose.Types.ObjectId(payload.id),
    });

    if (!user)
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          status: 'failed',
          data: { message: 'invalid jwt. user could not be found .' },
        },
        HttpStatus.UNAUTHORIZED,
      );

    return user;
  }
}
