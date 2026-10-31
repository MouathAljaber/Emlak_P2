CREATE TABLE IF NOT EXISTS leads (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(60),
  player_age TINYINT UNSIGNED,
  group_size SMALLINT UNSIGNED,
  travel_month VARCHAR(40),
  trip_type VARCHAR(80) NOT NULL,
  message TEXT,
  consent BOOLEAN NOT NULL,
  status ENUM('new', 'contacted', 'qualified', 'closed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX leads_created_at_idx (created_at),
  INDEX leads_status_idx (status)
);
