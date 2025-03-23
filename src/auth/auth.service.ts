import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  generateJwt(user: never) {
    throw new Error('Method not implemented.');
  }
  validateUser(username: string, password: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const userExists = await this.userModel.findOne({ username });
    if (userExists) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    const user = new this.userModel({ username, password: hashedPassword });
    await user.save();
    return { message: 'User registered successfully' };
}

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
        console.error("User not found:", username);
        throw new UnauthorizedException("Invalid credentials");
    }

    console.log("Stored password hash:", user.password);
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
        throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: user._id, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return {
        access_token,
        username: user.username,
    };
}

  
}
