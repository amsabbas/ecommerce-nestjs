import { Role } from './role.enum';

export interface JwtPayload {
  email: string;
  sub: number;
 role:Role
}
