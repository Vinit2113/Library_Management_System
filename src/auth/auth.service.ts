import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // async signIn(
  //   email: string,
  //   password: string,
  // ): Promise<{ access_token: string }> {
  //   const user = await this.userService.find(email);
  //   if (user.password !== password) {
  //     throw new UnauthorizedException('password is incorrect');
  //   }
  //   const payload = {
  //     email: user.email,
  //     userId: user.id,
  //     role: user.role,
  //   };
  //   return { access_token: await this.jwtService.signAsync(payload) };
  // }

  async validateUser(email: string, password: string) {
    const user = await this.userService.find(email);

    if (!user) {
      console.log(`User with email ${email} not found`);
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`Password for user with email ${email} is invalid`);
      return null;
    }
    const payload = {
      email: user.email,
      userId: user.id,
      role: user.role,
    };
    // console.log();
    return {
      email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string) {
    try {
      const decoded = await this.jwtService.verify(token);
      console.log(decoded);
      return decoded;
    } catch (error) {
      throw new ConflictException('Token Expired or Invalid');
    }
  }
}
