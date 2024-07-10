import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {ExecutionContextHost} from "@nestjs/core/helpers/execution-context-host";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('JwtAuthGuard: canActivate called');
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    if (!request) {
      const graphqlContext = context.getArgs()[2];
      return super.canActivate(new ExecutionContextHost([graphqlContext.req]));
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('JwtAuthGuard: handleRequest called', { err, user, info });
    if (err || !user) {
      console.log('JwtAuthGuard: handleRequest error', { err });
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
