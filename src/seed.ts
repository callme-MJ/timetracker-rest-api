import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { UserRole } from './users/user.schema';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  const users = app.get(UsersService);

  const existingAdmin = await users.findByEmail('admin@example.com');
  if (!existingAdmin) {
    await users.createUser('admin@example.com', 'Admin', 'admin123', UserRole.ADMIN);
    console.log('Created admin: admin@example.com / admin123');
  } else {
    console.log('Admin already exists');
  }

  const existingEmp = await users.findByEmail('john@example.com');
  if (!existingEmp) {
    await users.createUser('john@example.com', 'John', 'password123', UserRole.EMPLOYEE);
    console.log('Created employee: john@example.com / password123');
  } else {
    console.log('Employee already exists');
  }

  await app.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});


