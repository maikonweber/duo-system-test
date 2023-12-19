import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';

import { AppointmentStatus } from './appointment.enum';

@Entity('Appointment')
export class Appointment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  timestamp: Date;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus,
  })
  status: AppointmentStatus;

  @ApiProperty()
  @Column()
  patientId: number;

  @ApiProperty()
  @ManyToOne(() => Patient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;
}
