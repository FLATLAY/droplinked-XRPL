import { BadRequestException } from '@nestjs/common';
import { isValidSecret } from 'xrpl';
import * as Joi from 'joi';

export class SignupDTO {
  xrplWalletSeed: string;
}

export const SignupSchema = Joi.object<SignupDTO>({
  xrplWalletSeed: Joi.string().custom((value) => {
    if (!isValidSecret(value))
      throw new BadRequestException('[ invalid seed value ]');

    return value;
  }),
});
