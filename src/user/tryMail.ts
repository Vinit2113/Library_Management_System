// import { Injectable, BadRequestException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './user.entity';
// import { NewUserDto } from './Dtos/Register.dtos';
// import * as bcrypt from 'bcrypt';
// import * as crypto from 'crypto';

// @Injectable()
// export class UserService {
//   constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

//   async RegisterUser(newUserDto: NewUserDto): Promise<User> {
//     const { username } = newUserDto;
//     const existingUser = await this.userRepo.findOne({
//       where: { username },
//     });
//     if (existingUser) {
//       throw new BadRequestException(`${username} already exists`);
//     }
//     const passwordHashed = await bcrypt.hash(newUserDto.password, 10);

//     const newUser = this.userRepo.create({
//       ...newUserDto,
//       password: passwordHashed,
//     });
//     return await this.userRepo.save(newUser);
//   }

//   async find(email: string): Promise<User | null> {
//     return await this.userRepo.findOne({ where: { email } });
//   }

//   async createPasswordResetToken(email: string): Promise<string> {
//     const user = await this.find(email);
//     if (!user) {
//       throw new BadRequestException('User not found');
//     }

//     const token = crypto.randomBytes(20).toString('hex');
//     user.resetPasswordToken = token;
//     user.resetPasswordExpires = new Date(Date.now() + 3600000); // Token expires in 1 hour
//     await this.userRepo.save(user);

//     return token;
//   }

//   async findByResetPasswordToken(token: string): Promise<User | null> {
//     return await this.userRepo.findOne({
//       where: { resetPasswordToken: token },
//     });
//   }

//   async resetPassword(token: string, newPassword: string): Promise<void> {
//     const user = await this.findByResetPasswordToken(token);
//     if (!user || user.resetPasswordExpires < Date.now()) {
//       throw new BadRequestException('Invalid or expired token');
//     }

//     const passwordHashed = await bcrypt.hash(newPassword, 10);
//     user.password = passwordHashed;
//     user.resetPasswordToken = null;
//     user.resetPasswordExpires = null;
//     await this.userRepo.save(user);
//   }
// }

// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class MailService {
//   async sendPasswordResetEmail(email: string, resetPasswordLink: string) {
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       host: 'smtp.ethereal.com',
//       port: 465,
//       secure: true,
//       auth: {
//         user: 'your-email@example.com',
//         pass: 'your-email-password',
//       },
//       tls: {
//         ciphers: 'TLSv1.2',
//       },
//     });

//     await transporter.sendMail({
//       from: '"Your Name 👻" <your-email@example.com>',
//       to: email,
//       subject: 'Reset Password',
//       text: `Click on the following link to reset your password: ${resetPasswordLink}`,
//     });
//   }
// }

// import { Body, Controller, Post } from '@nestjs/common';
// import { UserService } from './user.service';

// @Controller('user')
// export class UserController {
//   constructor(private userService: UserService) {}

//   @Post('forgot-password')
//   async forgotPassword(@Body('email') email: string) {
//     const token = await this.userService.createPasswordResetToken(email);
//     const resetPasswordLink = `http://yourdomain.com/reset-password?token=${token}`;
//     await this.userService.sendPasswordResetEmail(email, resetPasswordLink);
//     return { message: 'Password reset email sent' };
//   }

//   @Post('reset-password')
//   async resetPassword(
//     @Body('token') token: string,
//     @Body('newPassword') newPassword: string,
//   ) {
//     await this.userService.resetPassword(token, newPassword);
//     return { message: 'Password reset successfully' };
//   }
// }
