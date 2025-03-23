import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
   
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'JWT_SECRET',
      signOptions: { expiresIn: '24h' }, // Set token expiration
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

