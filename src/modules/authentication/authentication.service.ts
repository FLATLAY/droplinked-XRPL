import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UserDocument } from 'src/modules/users/models/user.model';
import { UsersService } from 'src/modules/users/users.service';
import { XRPLWalletsService } from 'src/modules/xrpl/services/xrpl-wallets.service';
import { Wallet } from 'xrpl';
import { SigninDTO } from './dtos/signin.dto';
import { SignupDTO } from './dtos/signup.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
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

    return this.usersService.createUser({
      xrplWalletSeed: wallet.seed,
      xrplClassicAddress: wallet.classicAddress,
    });
  }

  async signin({ xrplClassicAddress }: SigninDTO) {
    const user = await this.usersService.getUser({ xrplClassicAddress });

    if (!user) throw new BadRequestException('user does not exists .');

    return this.createJWT(user);
  }

  async createJWT(user: UserDocument) {
    return { jwt: this.jwtService.sign({ id: user.id }) };
  }
}
