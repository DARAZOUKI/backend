import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    try {
        const decoded = jwt.verify(token, this.configService.get('JWT_SECRET') ?? '');
      req['user'] = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
