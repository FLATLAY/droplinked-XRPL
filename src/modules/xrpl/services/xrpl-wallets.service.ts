import { Injectable } from '@nestjs/common';
import { Client } from 'xrpl/dist/npm/client';
import { XRPLHelper } from '../helpers/xrpl.helper';
import { URLS } from 'src/constants/urls.constant';
import * as xrpl from 'xrpl';

@Injectable()
export class XRPLWalletsService {
  private client: Client;

  constructor(private readonly xrplHelper: XRPLHelper) {
    this.client = new xrpl.Client(this.xrplHelper.getNetwork());
  }

  async createWallet(amount = '10000', faucetHost?: string) {
    await this.client.connect();

    const result = await this.client.fundWallet(null, {
      amount,
      faucetHost: faucetHost ? faucetHost : URLS.DEFAULT_FAUCET_HOST,
    });

    await this.client.disconnect();

    return result;
  }

  getWalletFromSeed(seed: string) {
    return xrpl.Wallet.fromSeed(seed);
  }
}
