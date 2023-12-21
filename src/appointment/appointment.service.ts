import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
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

  async create(createAppointmentDto: CreateAppointmentDto): Promise<void> {
    try {
      const appointment =
        this.appointmentRepository.create(createAppointmentDto);
      await this.appointmentRepository.save(appointment);
    } catch (error) {
      if (error.code === '23505') {
        // Código de erro 23505 indica violação de restrição única (duplicidade)
        throw new ConflictException(
          'Já existe um agendamento com esses dados.',
        );
      } else {
        this.logger.error(
          `Erro ao criar agendamento: ${error.message}`,
          error.stack,
        );
        throw new Error('Erro interno ao criar agendamento.');
      }
    }
  }

  async findAll(): Promise<Appointment[]> {
    try {
      return await this.appointmentRepository.find();
    } catch (error) {
      this.logger.error(
        `Erro ao buscar agendamentos: ${error.message}`,
        error.stack,
      );
      throw new Error('Erro interno ao buscar agendamentos.');
    }
  }

  async findOne(id: number): Promise<Appointment> {
    try {
      const appointment = await this.appointmentRepository.findOneOrFail({
        where: { id },
        relations: ['patient'],
      });
      return appointment;
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new NotFoundException('Agendamento não encontrado.');
      } else {
        this.logger.error(
          `Erro ao buscar agendamento por ID ${id}: ${error.message}`,
          error.stack,
        );
        throw new Error('Erro interno ao buscar agendamento.');
      }
    }
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    try {
      const appointment = await this.appointmentRepository.findOneOrFail({
        where: { id },
      });

      if (updateAppointmentDto.timestamp) {
        appointment.timestamp = new Date(updateAppointmentDto.timestamp);
      }
      if (updateAppointmentDto.status) {
        appointment.status = updateAppointmentDto.status;
      }

      await this.appointmentRepository.save(appointment);
      return appointment;
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new NotFoundException('Agendamento não encontrado.');
      } else {
        this.logger.error(
          `Erro ao atualizar agendamento ID ${id}: ${error.message}`,
          error.stack,
        );
        throw new Error('Erro interno ao atualizar agendamento.');
      }
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const appointment = await this.appointmentRepository.findOneOrFail({
        where: { id },
      });

      await this.appointmentRepository.remove(appointment);
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new NotFoundException('Agendamento não encontrado.');
      } else {
        this.logger.error(
          `Erro ao excluir agendamento ID ${id}: ${error.message}`,
          error.stack,
        );
        throw new Error('Erro interno ao excluir agendamento.');
      }
    }
  }
}
