import { Body, Controller, Post } from '@nestjs/common';
import { JoiValidationPipe } from 'src/utilities/validation-pipes/joi.validation-pipe';
import { AuthenticationService } from './authentication.service';
import { SignupDTO, SignupSchema } from './dtos/signup.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/signup')
  async signup(@Body(new JoiValidationPipe(SignupSchema)) body: SignupDTO) {
    return this.authenticationService.signup(body);
  }
}
