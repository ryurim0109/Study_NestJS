import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import type { Configuration } from '@config/configuration';
import { AppModule, ObserveInstrument } from '@/app.module';
import { HttpExceptionFilter } from '@common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cats API')
    .setDescription('Cats API documentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const config = app.get(ConfigService<Configuration, true>);
  await app.listen(config.get('app.port', { infer: true }));
}
void bootstrap();
