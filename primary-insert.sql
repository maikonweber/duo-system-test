INSERT INTO "User" ("username", "password")
VALUES
  ('maikon', 'password123'),
  ('john_doe', 'securepassword'),
  ('jane_smith', 'strongpass');

INSERT INTO "Patient" ("name", "email", "cpf", "deleted_at", "medical_history")
VALUES
  ('John Doe', 'john.doe@example.com', '123.456.789-01', NULL, ARRAY['Flu', 'Allergies']),
  ('Jane Smith', 'jane.smith@example.com', '987.654.321-09', NULL, ARRAY['Hypertension']),
  ('Alice Johnson', 'alice.johnson@example.com', '456.789.012-34', NULL, ARRAY['Diabetes', 'Asthma']);

INSERT INTO "Appointment" ("timestamp", "status", "patientId")
VALUES
  ('2023-01-01 10:00:00', 1, 1), 
  ('2023-02-15 15:30:00', 0, 2), 
  ('2023-03-20 09:45:00', 2, 3); 