import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { LocalAuthGuard } from 'src/auth/Guards/local.guards';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @UseGuards(LocalAuthGuard)
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @UseGuards(LocalAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Appointment | undefined> {
    return this.appointmentService.findOne(id);
  }

  @UseGuards(LocalAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    this.appointmentService.delete(id);
  }
}
