import { MigrationInterface, QueryRunner } from 'typeorm';
import { Logger } from '@nestjs/common';

export class Initial1703013785582 implements MigrationInterface {
  private readonly logger = new Logger(Initial1703013785582.name);
  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('UP');
    queryRunner.query(`
      CREATE TABLE "User" (
         "username" VARCHAR(255) NOT NULL,
         "password" VARCHAR(255) NOT NULL,
        ); 
      CREATE TABLE "Patient" (
        "id" SERIAL NOT NULL,
        "name" VARCHAR(255) NOT NULL,
        "email" VARCHAR(255) NOT NULL,
        "cpf" VARCHAR(14) NOT NULL,
        "deleted_at" TIMESTAMP,
        "medical_history" TEXT ARRAY,
        CONSTRAINT "PK_patient_id" PRIMARY KEY ("id")
      );
      CREATE TABLE "Appointment" (
        "id" SERIAL NOT NULL,
        "timestamp" TIMESTAMP NOT NULL,
        "status" INT NOT NULL DEFAULT 0 CHECK (status >= 0 AND status <= 2),
        "patientId" INT NOT NULL,
        CONSTRAINT "PK_appointment_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_appointment_patient" FOREIGN KEY ("patientId") REFERENCES "patient"("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Down');
    queryRunner.query(`
      DROP TABLE User; DROP TABLE Patient; DROP TABLE Appointment;
    `);
  }
}
