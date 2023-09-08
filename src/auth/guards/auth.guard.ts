import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../../constans/key-decorators';
import { Request } from 'express';
import { IUseToken } from '../interfaces/auth.interface';
import { useToken } from '../../utils/use.token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers['codrr_token'];

    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid token');
    }

    const manageToken: IUseToken | string = useToken(token);
    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token expirado');
    }

    const { sub } = manageToken;

    const user = await this.usersService.findUsersById(sub);

    if (!user) {
      throw new UnauthorizedException('Token expirado');
    }

    req.idUser = user.id;
    req.roleUser = user.role;

    return true;
  }
}
