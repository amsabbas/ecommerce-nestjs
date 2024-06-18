import { JwtPayload } from './jwt-payload';

export interface RequestUser extends Omit<JwtPayload, 'sub'> {
  userId?: number;
}

export interface Req {
  user?: RequestUser;
}
