import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(token: string): Promise<any> {
    console.log('ValidateUser token: ' + token);
    const decoded = this.jwtService.verify(token);
    return { userId: decoded.sub, username: decoded.preferred_username };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
