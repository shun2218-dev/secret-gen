import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  validate(username: string, password: string): boolean {
    if (
      username === this.configService.get('BASIC_AUTH_USERNAME') &&
      password === this.configService.get('BASIC_AUTH_PASSWORD')
    ) {
      return true;
    } else throw new UnauthorizedException();
  }
}
