import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}
  create(createAppointmentDto: CreateAppointmentDto) {
    const appointment = this.appointmentRepository.create(createAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }

  findAll() {
    return this.appointmentRepository.find();
  }

  async findOne(id: number): Promise<Appointment | undefined> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: id },
      relations: ['patient'],
    });
    if (!appointment) {
      throw new NotFoundException
    }

    return appointment;
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: id },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (updateAppointmentDto.timestamp) {
      appointment.timestamp = updateAppointmentDto.timestamp;
    }

    await this.appointmentRepository.save(appointment);

    return appointment;
  }

  async delete(id: number): Promise<void> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: id },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    await this.appointmentRepository.remove(appointment);
  }
}
