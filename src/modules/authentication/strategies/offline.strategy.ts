import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/modules/users/users.service';
import { isValidClassicAddress, isValidSecret } from 'xrpl';

@Injectable()
export class OfflineStrategy extends PassportStrategy(Strategy, 'offline') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  async validate() {
    const xrplWalletSeed = this.configService.get<string>('XRPL_WALLET_SEED');
    const xrplClassicAddress = this.configService.get<string>(
      'XRPL_CLASSIC_ADDRESS',
    );

    if (
      !isValidSecret(xrplWalletSeed) ||
      !isValidClassicAddress(xrplClassicAddress)
    )
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          status: 'failed',
          data: { message: 'invalid seed or classic address .' },
        },
        HttpStatus.UNAUTHORIZED,
      );

    const user = await this.usersService.getUser({
      xrplWalletSeed,
      xrplClassicAddress,
    });

    if (!user)
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          status: 'failed',
          data: { message: 'user could not be found .' },
        },
        HttpStatus.UNAUTHORIZED,
      );

    return user;
  }
}
