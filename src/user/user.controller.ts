import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { NewUserDto } from './Dtos/Register.dtos';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  @Post('/register')
  async addUser(@Body() newUserDto: NewUserDto): Promise<User> {
    return await this.userService.RegisterUser(newUserDto);
  }
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.authService.validateUser(email, password);
    // return 'logged in successfully'
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const token = await this.userService.forgotPassword(email);
    const resetPasswordLink = `http://localhost:7777/user/reset-password?token=${token}`;
    await this.mailService.sendMail(email, resetPasswordLink);
    // console.log('TOken---==-=', token);

    return { message: `Password reset mail sent to ${email}` };
  }

  @Post('reset-password')
  async resetPassword(
    @Param('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    // console.log('helo reset token', token);
    await this.userService.resetPassword(token, newPassword);
    return { message: 'Password reset successfully' };
  }
}
