import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwtConsts';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    JwtModule.register({
      privateKey: jwtConstants.secret,
      signOptions: { expiresIn: '5d' },
    }),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
