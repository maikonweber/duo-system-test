import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres', // Type of your database
        host: configService.get('DB_HOST'), // Database host
        port: configService.get('DB_PORT'), // Database port
        username: configService.get('DB_USERNAME'), // Database username
        password: configService.get('DB_PASSWORD'), // Database password
        database: configService.get('DB_NAME'), // Database name
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: ['migrations/*'],
        synchronize: true, // Auto-create tables based on entities (for development only)
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
