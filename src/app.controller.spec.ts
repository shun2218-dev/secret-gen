import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DEFAULT_LENGTH, S } from './constants';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    describe('check query', () => {
      it('default should be 22 length', () => {
        const { result } = appController.getSecret();
        expect(result.length === 22).toBe(true);
      });

      it('should be 10 length', () => {
        const { result } = appController.getSecret(10);
        expect(result.length === 10).toBe(true);
      });

      it('should be 30 length', () => {
        const { result } = appController.getSecret(30);
        expect(result.length === 30).toBe(true);
      });
    });

    describe('check bias', () => {
      it('should produce an unbiased distribution over many iterations', () => {
        const S_LENGTH = S.length;
        // 各文字の出現回数をカウントする配列
        const frequency = new Array<number>(S_LENGTH).fill(0);

        const numIterations = 10000; // 文字列生成回数
        const strLength = DEFAULT_LENGTH; // 1文字列あたりの長さ

        for (let i = 0; i < numIterations; i++) {
          const { result: randomStr } = appController.getSecret(strLength);
          for (const char of randomStr) {
            const index = S.indexOf(char);
            if (index !== -1) frequency[index]++;
          }
        }

        // 総カウントの計算
        const totalCount = frequency.reduce((a, b) => a + b, 0);
        console.log(`Total number of characters: ${totalCount}`);
        console.log('Frequency of occurrence of each letter:');
        const result: Record<'id' | 'percent' | 'count', string | number>[] =
          [];
        frequency.forEach((count, i) => {
          const percent = ((count / totalCount) * 100).toFixed(2);
          result.push({
            id: S[i],
            percent: `${percent}%`,
            count: `${count}回`,
          });
        });

        console.table(result);

        // オプション：各文字の出現数が理論上の期待値 (totalCount / 70) の±10%以内であることを検証
        const expectedFrequency = totalCount / S_LENGTH;
        frequency.forEach((count) => {
          expect(count).toBeGreaterThanOrEqual(expectedFrequency * 0.9);
          expect(count).toBeLessThanOrEqual(expectedFrequency * 1.1);
        });
      });
    });
  });
});
