import { Request } from '@nestjs/common';

export interface RequestWithID extends Request {
  userID: number;
}
