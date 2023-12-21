import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(createPatientDto);
    return await this.patientRepository.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findOne(id: number): Promise<Patient | undefined> {
    return await this.patientRepository.findOne({
      where: { id: id },
      relations: ['appointments'],
    });
  }

  async update(id: number, patientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id: id },
    });

    if (!patient) {
      throw new NotFoundException('Appointment not found');
    }

    patient.name = patientDto.name;
    patient.email = patientDto.email;
    patient.cpf = patientDto.cpf;
    patient.deleted_at = patientDto.deleted_at;
    patient.medical_history = patientDto.medical_history;

    await this.patientRepository.save(patient);

    return patient;
  }

  async delete(id: number): Promise<void> {
    const patient = await this.patientRepository.findOne({
      where: { id: id },
    });

    if (!patient) {
      throw new NotFoundException('Appointment not found');
    }

    await this.patientRepository.remove(patient);
  }
}
