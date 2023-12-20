import { Injectable, Logger } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);
  constructor(
    @InjectRepository(Patient)
    private readonly PatientRepository = Repository<Patient>,
  ) {}
  create(createPatientDto: CreatePatientDto) {
    return 'This action adds a new patient';
  }

  findAll() {
    return `This action returns all patient`;
  }
}
