"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const users_service_1 = require("./users/users.service");
const user_schema_1 = require("./users/user.schema");
async function seed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule, { logger: false });
    const users = app.get(users_service_1.UsersService);
    const existingAdmin = await users.findByEmail('admin@example.com');
    if (!existingAdmin) {
        await users.createUser('admin@example.com', 'Admin', 'admin123', user_schema_1.UserRole.ADMIN);
        console.log('Created admin: admin@example.com / admin123');
    }
    else {
        console.log('Admin already exists');
    }
    const existingEmp = await users.findByEmail('john@example.com');
    if (!existingEmp) {
        await users.createUser('john@example.com', 'John', 'password123', user_schema_1.UserRole.EMPLOYEE);
        console.log('Created employee: john@example.com / password123');
    }
    else {
        console.log('Employee already exists');
    }
    await app.close();
}
seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map