INSERT INTO roles (id, name) VALUES
(gen_random_uuid(), 'ADMIN'),
(gen_random_uuid(), 'HAIRDRESSER');

INSERT INTO record_status (id, name) VALUES
(gen_random_uuid(), 'ACTIVE'),
(gen_random_uuid(), 'INACTIVE'),
(gen_random_uuid(), 'DELETED');