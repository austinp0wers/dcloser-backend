import { CustomUnauthorizedException } from './../exceptions/customUnauthorizedError.exception';
import { CustomInternalException } from './../exceptions/customInternal.exception';
import { JwtService } from '@nestjs/jwt';
import { ResponseInterceptor } from './../interceptors/response.interceptor';
import { Injectable, NestMiddleware, UseInterceptors } from '@nestjs/common';

@UseInterceptors(new ResponseInterceptor())
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new CustomUnauthorizedException('Unauthorized');
    }
    let decoded;
    try {
      const token: string = authorization.replace('Bearer ', '');
      decoded = this.jwtService.decode(token);
      if (!decoded || !decoded.user_id) {
        throw new CustomUnauthorizedException('not found');
      }
    } catch (err) {
      console.log('err', err);
      throw new CustomInternalException(err);
    }
    req.user = {
      business_user_id: decoded.user_id,
      role: decoded.role,
      business_id: decoded.business_id,
    };

    next();
  }
}
