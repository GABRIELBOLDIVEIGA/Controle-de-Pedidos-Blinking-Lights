import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() loginUsuarioDto: LoginUsuarioDto,
    @Res({ passthrough: true }) response: Response,
    @Req() req,
  ) {
    const token = await this.authService.signIn(loginUsuarioDto);

    req.session.uuid = token;

    response.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 1000, // 1 semana
    });

    return { access_token: token };
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Post('change-password')
  async updatePassword(
    @Body()
    changePassword: ChangePasswordDto,
  ) {
    return this.authService.updatePassword(changePassword);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() email: ForgotPasswordDto) {
    return this.authService.forgotPassword(email);
  }
}
