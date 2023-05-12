import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(3000);
}
bootstrap();
