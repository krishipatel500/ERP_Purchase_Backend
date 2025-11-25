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
    if (cachedApp)
        return cachedApp;
    const expressApp = (0, express_1.default)();
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp), {
            logger: ['log', 'debug', 'warn', 'error'],
        });
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
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
        console.error('❌ ERROR during createApp():', err);
        throw err;
    }
}
async function handler(req, res) {
    try {
        const app = await createApp();
        return app(req, res);
    }
    catch (err) {
        console.error('❌ ERROR during handler():', err);
        res.status(500).send('Internal Server Error');
    }
}
if (process.env.VERCEL !== '1') {
    (async () => {
        try {
            const app = await core_1.NestFactory.create(app_module_1.AppModule);
            app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
            const config = new swagger_1.DocumentBuilder()
                .setTitle('ERP API Docs')
                .setDescription('Swagger documentation for ERP system')
                .setVersion('1.0')
                .addBearerAuth()
                .build();
            const document = swagger_1.SwaggerModule.createDocument(app, config);
            swagger_1.SwaggerModule.setup('api-docs', app, document);
            await app.listen(3000);
            console.log(`Local running at http://localhost:3000/api-docs`);
        }
        catch (err) {
            console.error('❌ Local bootstrap error:', err);
        }
    })();
}
//# sourceMappingURL=main.js.map