// src/scripts/create-admin-user.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UsersService);

  // Your script logic here
  try {
    const adminUser = await userService.createAdminUser();
    console.log('Admin user created:', adminUser);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    await app.close();
  }
}

bootstrap();
