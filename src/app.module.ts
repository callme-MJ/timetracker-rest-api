import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { TimeModule } from './time.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb+srv://jabir:1234@cluster0.vf1ye.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    UsersModule,
    AuthModule,
    TimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
