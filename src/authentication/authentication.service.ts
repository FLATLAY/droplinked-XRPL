import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { XRPLWalletsService } from 'src/modules/xrpl/services/xrpl-wallets.service';
import { Wallet } from 'xrpl';
import { SignupDTO } from './dtos/signup.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly xrplWalletsService: XRPLWalletsService,
  ) {}

  async signup(data: SignupDTO) {
    let wallet: Wallet;

    if (data.xrplWalletSeed) {
      wallet = this.xrplWalletsService.getWalletFromSeed(data.xrplWalletSeed);
    } else {
      wallet = (await this.xrplWalletsService.createWallet()).wallet;
    }

    const user = await this.usersService.getUser({
      xrplWalletSeed: wallet.seed,
    });

    if (user) throw new BadRequestException('user already exists .');

    return this.usersService.createUser({ xrplWalletSeed: wallet.seed });
  }
}
