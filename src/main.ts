import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

let cachedApp: express.Application | null = null;

/**
 * Create the NestJS app for Vercel serverless environment
 */
async function createApp(): Promise<express.Application> {
  if (cachedApp) return cachedApp;

  const expressApp = express();

  try {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      {
        logger: ['log', 'debug', 'warn', 'error'],
      },
    );

    // Global Validation Pipe
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    // ⭐ Swagger Configuration
    const config = new DocumentBuilder()
      .setTitle('ERP API Docs')
      .setDescription('Swagger documentation for ERP system')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.init();

    cachedApp = expressApp;
    return expressApp;
  } catch (err) {
    console.error('❌ ERROR during createApp():', err);
    throw err;
  }
}

/**
 * Serverless handler for Vercel
 */
export default async function handler(req: any, res: any) {
  try {
    const app = await createApp();
    return app(req, res);
  } catch (err) {
    console.error('❌ ERROR during handler():', err);
    res.status(500).send('Internal Server Error');
  }
}

/**
 * Local Development (when not running on Vercel)
 */
if (process.env.VERCEL !== '1') {
  (async () => {
    try {
      const app = await NestFactory.create(AppModule);
      app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

      const config = new DocumentBuilder()
        .setTitle('ERP API Docs')
        .setDescription('Swagger documentation for ERP system')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api-docs', app, document);

      await app.listen(3000);
      console.log(`🚀 Local server running at: http://localhost:3000`);
      console.log(`📄 Swagger Docs: http://localhost:3000/api-docs`);
    } catch (err) {
      console.error('❌ Local bootstrap error:', err);
    }
  })();
}
