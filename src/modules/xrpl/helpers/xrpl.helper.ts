import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { ENVIRONMENTS } from 'src/constants/environments.constant';
import { NETWORKS } from 'src/constants/networks.constant';

@Injectable()
export class XRPLHelper {
  constructor(private readonly configService: ConfigService) {}

  getNetwork() {
    switch (this.configService.get<string>('ENVIRONMENT')) {
      case ENVIRONMENTS.Type.MAIN:
        return NETWORKS.MAIN;
      case ENVIRONMENTS.Type.TEST:
        return NETWORKS.TEST;
      case ENVIRONMENTS.Type.DEV:
        return NETWORKS.DEV;
      default:
        return 'NONE';
    }
  }
}
