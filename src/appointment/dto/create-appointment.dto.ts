import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsDateString } from 'class-validator';
import { AppointmentStatus } from '../entities/appointment.enum';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsDateString()
  timestamp: Date;

  @ApiProperty({ enum: AppointmentStatus, default: AppointmentStatus.PENDING })
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @ApiProperty()
  @IsInt()
  patientId: number;
}
