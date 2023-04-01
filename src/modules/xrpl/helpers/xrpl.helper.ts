import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { NETWORKS } from 'src/modules/xrpl/constants/networks.constant';
import { ENVIRONMENT } from '../enums/environment.enum';

@Injectable()
export class XRPLHelper {
  constructor(private readonly configService: ConfigService) {}

  getNetwork() {
    switch (this.configService.get<string>('ENVIRONMENT')) {
      case ENVIRONMENT.DEVELOPMENT:
        return NETWORKS.DEVELOPMENT;
      case ENVIRONMENT.PRODUCTION:
        return NETWORKS.PRODUCTION;
      case ENVIRONMENT.TEST:
        return NETWORKS.TEST;
      default:
        return 'NONE';
    }
  }
}
