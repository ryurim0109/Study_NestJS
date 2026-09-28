import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import type { Configuration } from '@config/configuration';
import { AppModule, ObserveInstrument } from '@/app.module';
import { HttpExceptionFilter } from '@common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = app.get(ConfigService<Configuration, true>);
  await app.listen(config.get('app.port', { infer: true }));
}
void bootstrap();
