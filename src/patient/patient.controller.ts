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
import { JwtAuthGuard } from 'src/auth/Guards/local.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('patient')
@ApiTags('Patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  @ApiBearerAuth('XYZ')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Patient | undefined> {
    return this.patientService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() patientDto: UpdatePatientDto,
  ): Promise<Patient> {
    return this.patientService.update(id, patientDto);
  }

  @UseGuards(JwtAuthGuard)
  async delete(@Param() id: number): Promise<void> {
    return this.patientService.delete(id);
  }
}
