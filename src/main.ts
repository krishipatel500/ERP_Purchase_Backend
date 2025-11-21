import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';

let cachedApp: express.Application;

async function createApp(): Promise<express.Application> {
  if (cachedApp) return cachedApp;

  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }));

  await app.init();
  cachedApp = expressApp;

  return expressApp;
}

// 🚀 Export for Vercel
export default async function handler(req: express.Request, res: express.Response) {
  const app = await createApp();
  return app(req, res);
}

// 🚀 Local development only (NOT executed on Vercel)
if (process.env.VERCEL !== '1') {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }));
    await app.listen(process.env.PORT || 3000);
    console.log(`Local server running on: ${await app.getUrl()}`);
  }
  bootstrap();
}
