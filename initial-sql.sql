-- Create the "User" table
CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL
);

-- Create the "Patient" table
CREATE TABLE "Patient" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "cpf" VARCHAR(14) NOT NULL UNIQUE,
  "deleted_at" TIMESTAMP,
  "medical_history" TEXT ARRAY
);

-- Create the "Appointment" table
CREATE TABLE "Appointment" (
  "id" SERIAL PRIMARY KEY,
  "timestamp" TIMESTAMP NOT NULL,
  "status" INT NOT NULL DEFAULT 0 CHECK (status >= 0 AND status <= 2),
  "patientId" INT NOT NULL,
  CONSTRAINT "FK_appointment_patient" FOREIGN KEY ("patientId") REFERENCES "Patient"("id"),
  CONSTRAINT "UQ_appointment_timestamp_patientId" UNIQUE ("timestamp", "patientId")
);
