import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

let cachedApp: express.Application | null = null;

async function createApp(): Promise<express.Application> {
  if (cachedApp) return cachedApp;

  const expressApp = express();

  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), {
      logger: ['error', 'warn', 'log', 'debug'],
    });

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }));

    const config = new DocumentBuilder()
      .setTitle('ERP API Docs')
      .setDescription('Swagger documentation for ERP system')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    // ensure modules that run on init won't crash the whole function without logging
    await app.init();

    cachedApp = expressApp;
    return expressApp;
  } catch (err) {
    // CRITICAL: log full error so Vercel shows it in logs
    // eslint-disable-next-line no-console
    console.error('createApp() failed:', err instanceof Error ? err.stack ?? err.message : err);
    // rethrow so Vercel marks invocation failed, but the real stack is now in logs
    throw err;
  }
}

export default async function handler(req: express.Request, res: express.Response) {
  try {
    const app = await createApp();
    return app(req, res);
  } catch (err) {
    // Ensure client receives a 500 and we logged the cause above
    // eslint-disable-next-line no-console
    console.error('handler caught error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}

// local dev: start a real server when not running on Vercel
if (process.env.VERCEL !== '1') {
  (async () => {
    try {
      const app = await NestFactory.create(AppModule);
      app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }));

      const config = new DocumentBuilder()
        .setTitle('ERP API Docs')
        .setDescription('Swagger documentation for ERP system')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api-docs', app, document);

      const port = process.env.PORT ? Number(process.env.PORT) : 3000;
      await app.listen(port);
      // eslint-disable-next-line no-console
      console.log(`Local server listening on ${port}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Local bootstrap failed:', err);
      process.exit(1);
    }
  })();
}
