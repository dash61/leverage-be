import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const whitelist = ["http://localhost:3000"];
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  app.use(cookieParser(process.env.TOKEN_KEY));
  app.enableCors({
    credentials: true,
    origin: (origin, callback) => {
      if (whitelist.includes(origin)) {
        return callback(null, true);
      }
    }
  });
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
