"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const express_1 = require("express");
const swagger_1 = require("@nestjs/swagger");
let cachedApp;
async function createApp() {
    if (cachedApp)
        return cachedApp;
    const expressApp = (0, express_1.default)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ERP API Docs')
        .setDescription('Swagger documentation for ERP system')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.init();
    cachedApp = expressApp;
    return expressApp;
}
async function handler(req, res) {
    const app = await createApp();
    return app(req, res);
}
if (process.env.VERCEL !== '1') {
    async function bootstrap() {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }));
        const config = new swagger_1.DocumentBuilder()
            .setTitle('ERP API Docs')
            .setDescription('Swagger documentation for ERP system')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api-docs', app, document);
        await app.listen(process.env.PORT || 3000);
        console.log(`📌 Local server running at: ${await app.getUrl()}`);
        console.log(`📄 Swagger Docs: ${await app.getUrl()}/api-docs`);
    }
    bootstrap();
}
//# sourceMappingURL=main.js.map