import { BadRequestException } from '@nestjs/common/exceptions';
import { isValidClassicAddress } from 'xrpl';
import * as Joi from 'joi';

export class SigninDTO {
  xrplClassicAddress: string;
}

export const SigninSchema = Joi.object<SigninDTO>({
  xrplClassicAddress: Joi.string().custom((value) => {
    if (!isValidClassicAddress(value))
      throw new BadRequestException('[ invalid classic address value ]');

    return value;
  }),
});
