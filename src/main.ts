import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // getting the config service
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('config.app.port');
  const ENV = configService.get<string>('config.environment');
  const BASE_URL = configService.get<string>('config.baseUrl');

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Taxi24 CHALLENGE')
    .setDescription('The goal of this project is to create a public API REST.')
    .setContact('Ender Urdaneta', '', 'urdanetaenderjose@gmail.com')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'RatherLabs CHALLENGE',
  });

  // starting the server
  await app.listen(PORT, BASE_URL, () => {
    console.log(`app listening at ${PORT} in ${ENV}`);
  });
}
bootstrap();
