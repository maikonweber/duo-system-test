import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    PatientModule,
    AppointmentModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
