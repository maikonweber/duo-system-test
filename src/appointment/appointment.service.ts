import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}
  create(createAppointmentDto: CreateAppointmentDto) {
    try {
      const appointment = this.appointmentRepository.create(createAppointmentDto);
      this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new NotFoundException('Já existe um agendamento com esses dados.');
    }
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
      throw new NotFoundException();
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
      appointment.timestamp = new Date(updateAppointmentDto.timestamp);
    }
    if (updateAppointmentDto.status) {
      appointment.status = updateAppointmentDto.status;
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
