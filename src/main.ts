import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin:['http://localhost:3000','http://localhost:3002'], // Allow frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  });

  const port = configService.get<number>('PORT') || 5000;
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();
