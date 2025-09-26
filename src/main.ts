import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // allow all origins
  
  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
