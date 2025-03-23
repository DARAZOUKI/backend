import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log(' JWT AuthGuard - Raw Request:', request.headers); 
  console.log(' JWT AuthGuard - Extracted User:', request.user);  
    return super.canActivate(context);
  }
}
