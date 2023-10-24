import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  public hello() {
    return readFileSync(
      join(__dirname, '../src/common/http/ApiResponse.ts'),
    ).toString();
  }
}
