import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [/localhost:3\d{3}$/],
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
