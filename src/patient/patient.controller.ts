import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { LocalAuthGuard } from 'src/auth/Guards/local.guards';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @UseGuards(LocalAuthGuard)
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @UseGuards(LocalAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Patient | undefined> {
    return this.patientService.findOne(id);
  }

  @UseGuards(LocalAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() patientDto: UpdatePatientDto,
  ): Promise<Patient> {
    return this.patientService.update(id, patientDto);
  }

  @UseGuards(LocalAuthGuard)
  async delete(@Param() id: number): Promise<void> {
    return this.patientService.delete(id);
  }
}
