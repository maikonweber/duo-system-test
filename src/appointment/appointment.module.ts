import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwtConsts';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]),
  JwtModule.register({
    privateKey: jwtConstants.secret,
    signOptions: { expiresIn: '5d' },
  })],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
