import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from './user.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService
  ) {}

  async register(username: string, password: string) {
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) throw new ConflictException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashedPassword });
    await user.save();

    return { message: 'User registered successfully' };
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = jwt.sign({ userId: user._id }, this.configService.get('JWT_SECRET') ?? '', {
        expiresIn: '1h',
      });

    return { token };
  }
}
