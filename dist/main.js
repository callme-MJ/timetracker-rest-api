"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [/localhost:3\d{3}$/],
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization',
        methods: 'GET,POST,PUT,DELETE,OPTIONS',
    });
    await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map