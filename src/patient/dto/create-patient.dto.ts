import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsDateString,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  deleted_at?: Date;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  medical_history?: string[];
}
