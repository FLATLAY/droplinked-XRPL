import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/modules/users/users.service';
import { isValidSecret } from 'xrpl';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class OfflineStrategy extends PassportStrategy(Strategy, 'offline') {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  async validate() {
    const xrplWalletSeed = this.configService.get<string>('XRPL_WALLET_SEED');

    if (!isValidSecret(xrplWalletSeed))
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          status: 'failed',
          data: { message: 'invalid seed or classic address .' },
        },
        HttpStatus.UNAUTHORIZED,
      );

    let user = await this.usersService.getUser({
      xrplWalletSeed,
    });

    if (!user)
      user = await this.authenticationService.signup({ xrplWalletSeed });

    return user;
  }
}
