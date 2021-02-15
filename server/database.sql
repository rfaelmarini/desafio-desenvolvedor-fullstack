CREATE DATABASE simulator;

CREATE TABLE lead(
  lead_id INT GENERATED ALWAYS AS IDENTITY,
  lead_name VARCHAR(255),
  lead_email VARCHAR(100),
  phone VARCHAR(15),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
  PRIMARY KEY(lead_id)
);

CREATE TABLE simulate(
  simulate_id INT GENERATED ALWAYS AS IDENTITY,
  lead_id INT,
  tax_cdi FLOAT(2),
  tax_poupanca FLOAT(2),
  tax_cdb FLOAT(2),
  deadline INT,
  amount FLOAT(2),
  result_poupanca FLOAT(2),
  result_cdi FLOAT(2),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
  PRIMARY KEY(simulate_id),
  CONSTRAINT fk_lead FOREIGN KEY(lead_id) REFERENCES lead(lead_id) ON DELETE CASCADE
);