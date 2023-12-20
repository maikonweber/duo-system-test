import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres', // Type of your database
        host: configService.get('DB_HOST'), 
        port: configService.get('DB_PORT'), 
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'), // Database password
        database: configService.get('DB_NAME'), 
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
