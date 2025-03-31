// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Configuração de CORS para permitir chamadas do frontend (Vite)
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // ajuste conforme a porta do seu Vite
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
