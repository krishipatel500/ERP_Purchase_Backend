import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';

// 🔥 Swagger imports
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

let cachedApp: express.Application;

async function createApp(): Promise<express.Application> {
  if (cachedApp) return cachedApp;

  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }));

  // ⭐ Initialize Swagger for Vercel
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
}

// 🚀 Export for Vercel Serverless function
export default async function handler(req: express.Request, res: express.Response) {
  const app = await createApp();
  return app(req, res);
}

// 🚀 Local development only
if (process.env.VERCEL !== '1') {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Pipes for local
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }));

    // ⭐ Swagger for local
    const config = new DocumentBuilder()
      .setTitle('ERP API Docs')
      .setDescription('Swagger documentation for ERP system')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(process.env.PORT || 3000);
    console.log(`📌 Local server running at: ${await app.getUrl()}`);
    console.log(`📄 Swagger Docs: ${await app.getUrl()}/api-docs`);
  }
  bootstrap();
}
