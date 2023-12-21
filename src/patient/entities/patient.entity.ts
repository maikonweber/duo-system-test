// patient.entity.ts

import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';

@Entity('Patient')
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;
  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;
  @ApiProperty()
  @Column({ type: 'varchar', length: 14, nullable: false })
  cpf: string;
  @ApiProperty()
  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;
  @ApiProperty()
  @Column('text', { array: true, nullable: true })
  medical_history: string[];
  @ApiProperty()
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];
}
