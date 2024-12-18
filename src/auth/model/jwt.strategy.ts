import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Constants } from '../../base/model/constants';
import { JwtPayload } from './jwt-payload';
import { RequestUser } from './request-user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Constants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<RequestUser> {
    const user = { ...payload };
    delete user.sub;
    return { userId: payload.sub, ...user };
  }
}
