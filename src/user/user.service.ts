import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { NewUserDto } from './Dtos/Register.dtos';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private mailService: MailService,
  ) {}

  async RegisterUser(newUserDto: NewUserDto): Promise<User> {
    const { username } = newUserDto;
    console.log(newUserDto);
    const existingUser = await this.userRepo.findOne({
      where: { username },
    });
    // console.log(existingUser);
    if (existingUser) {
      throw new BadRequestException(`${username} already exists`);
    }
    const passwordHashed = await bcrypt.hash(newUserDto.password, 10);

    const newUser = this.userRepo.create({
      ...newUserDto,
      password: passwordHashed,
    });
    return await this.userRepo.save(newUser);
  }

  async find(email: string): Promise<User | null> {
    const user = await this.userRepo.find({ where: { email } });
    return user.length ? user[0] : null;
  }

  async forgotPassword(email: string): Promise<User | null> {
    const user = await this.find(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const token = crypto.randomBytes(10).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 600000);
    await this.userRepo.save(user);

    return user;
  }

  // async findByResetPasswordToken(token: string): Promise<User | null> {
  //   const findToken = await this.userRepo.findOne({
  //     where: { resetPasswordToken: token },
  //   });

  //   return findToken;
  // }
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // console.log('helo', token);

    const user = await this.userRepo.findOne({
      where: { resetPasswordToken: token },
    });
    if (!user || user.resetPasswordExpires.getTime() < Date.now()) {
      throw new BadRequestException('Invalid or expired token');
    }

    if (!newPassword) {
      throw new BadRequestException('New password is required');
    }
    // console.log('User====', user);
    // console.log("user's token", user.resetPasswordToken);
    const resetPasswordLink = `http://localhost:7777/user/reset-password?token=${token}`;
    // console.log('Link=-=-==-====-==', resetPasswordLink);

    // Send email with reset password link to
    await this.mailService.sendMail(user.email, resetPasswordLink);
    // console.log('Reset Password Link', resetPasswordLink);

    const salt = await bcrypt.genSaltSync(10); // Generate salt once with given rounds
    const hashedPassword = await bcrypt.hash(newPassword, salt); // Use same salt for hashing
    console.log('HashedPassword', hashedPassword);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await this.userRepo.save(user);
  }
}
