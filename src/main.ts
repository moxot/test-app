import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swagger from '../config/swagger';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pj = require('../../package.json');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swagger(app, pj?.version || '0.0.1', 3001);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(3001);
}
bootstrap();
