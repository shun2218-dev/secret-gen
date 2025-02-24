import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({
    credentials: true,
  });

  app.use(helmet());
}
bootstrap().catch((err) => {
  console.error(`Failed to bootstrap: `, err);
});
