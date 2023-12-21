import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    try {
      const patient = this.patientRepository.create(createPatientDto);
      return await this.patientRepository.save(patient);
    } catch (error) {
      this.logger.error(
        `Error creating patient: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to create patient');
    }
  }

  async findAll(): Promise<Patient[]> {
    try {
      return await this.patientRepository.find();
    } catch (error) {
      this.logger.error(
        `Error fetching patients: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to fetch patients');
    }
  }

  async findOne(id: number): Promise<Patient | undefined> {
    try {
      return await this.patientRepository.findOne({
        where: { id: id },
        relations: ['appointments'],
      });
    } catch (error) {
      this.logger.error(
        `Error fetching patient by ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to fetch patient');
    }
  }

  async update(id: number, patientDto: UpdatePatientDto): Promise<Patient> {
    try {
      const patient = await this.patientRepository.findOne({
        where: { id: id },
      });

      if (!patient) {
        throw new NotFoundException('Patient not found');
      }

      patient.name = patientDto.name;
      patient.email = patientDto.email;
      patient.cpf = patientDto.cpf;
      patient.deleted_at = patientDto.deleted_at;
      patient.medical_history = patientDto.medical_history;

      await this.patientRepository.save(patient);

      return patient;
    } catch (error) {
      this.logger.error(
        `Error updating patient ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to update patient');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const patient = await this.patientRepository.findOne({
        where: { id: id },
      });

      if (!patient) {
        throw new NotFoundException('Patient not found');
      }

      await this.patientRepository.remove(patient);
    } catch (error) {
      this.logger.error(
        `Error deleting patient ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to delete patient');
    }
  }
}
