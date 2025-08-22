CREATE DATABASE IF NOT EXISTS clinic_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE clinic_db;

-- Las tablas se crean por JPA (ddl-auto=update), pero si quieres crear manualmente:
CREATE TABLE IF NOT EXISTS patient (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(150),
  last_name VARCHAR(150),
  gender VARCHAR(20),
  birth_date DATE,
  phone VARCHAR(50),
  address VARCHAR(255),
  dni VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS clinical_record (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  patient_id BIGINT NOT NULL,
  created_at DATETIME,
  nurse VARCHAR(150),
  reason VARCHAR(255),
  anamnesis TEXT,
  physical_exam TEXT,
  treatment_plan TEXT,
  notes TEXT,
  FOREIGN KEY (patient_id) REFERENCES patient(id) ON DELETE CASCADE
);