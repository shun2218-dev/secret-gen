import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { MAX_VALID_BYTE, S, S_LENGTH } from './constants';
@Injectable()
export class AppService {
  generateSecret(length = 22): string {
    let result = '';
    while (result.length < length) {
      // 一度に128バイト取得（バッチサイズは任意）
      const bytes = randomBytes(128);
      for (const byte of bytes) {
        // 210未満のバイトのみ使用し、偏りを排除
        if (byte < MAX_VALID_BYTE) {
          result += S[byte % S_LENGTH];
          if (result.length === length) {
            break;
          }
        }
      }
    }
    return result;
  }
}
