import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, signInDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authservice.signup(dto);
  }
  @Post('signin')
  signin(@Body() dto: signInDto) {
    return this.authservice.signin(dto);
  }
}
