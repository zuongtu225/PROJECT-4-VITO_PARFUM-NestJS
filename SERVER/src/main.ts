declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: `http://localhost:3000`,
    methods: 'GET,PUT,PATCH,DELETE,POST',
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
    optionsSuccessStatus: 200,
  }); // <- enable CORS
  await app.listen(process.env.PORT);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
