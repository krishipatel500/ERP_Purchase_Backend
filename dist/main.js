"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const express_1 = require("express");
const swagger_1 = require("@nestjs/swagger");
let cachedApp = null;
async function createApp() {
    var _a;
    if (cachedApp)
        return cachedApp;
    const expressApp = (0, express_1.default)();
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp), {
            logger: ['error', 'warn', 'log', 'debug'],
        });
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
    catch (err) {
        console.error('createApp() failed:', err instanceof Error ? (_a = err.stack) !== null && _a !== void 0 ? _a : err.message : err);
        throw err;
    }
}
async function handler(req, res) {
    try {
        const app = await createApp();
        return app(req, res);
    }
    catch (err) {
        console.error('handler caught error:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
}
if (process.env.VERCEL !== '1') {
    (async () => {
        try {
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
            const port = process.env.PORT ? Number(process.env.PORT) : 3000;
            await app.listen(port);
            console.log(`Local server listening on ${port}`);
        }
        catch (err) {
            console.error('Local bootstrap failed:', err);
            process.exit(1);
        }
    })();
}
//# sourceMappingURL=main.js.map