CREATE SCHEMA user_credential_liquibase AUTHORIZATION user_credential_db_user;

drop table if exists users CASCADE;
create table users
(
    id       bigserial primary key,
    email   varchar(255),
    password varchar(255),
    username varchar(255) unique,
    role varchar(16)
);

INSERT INTO users (id, email, password, username, role) VALUES (1, 'ilya@java.com', '$2a$12$BXeONFjoaZQfI7WH/1L0JOmrJ5oV2Q2zcVIBrLh1K3ABZG73Z9nZ6', 'admin', 'ROLE_ADMIN');
INSERT INTO users (id, email, password, username, role) VALUES (2, 'antonio@java.com', '$2a$12$BXeONFjoaZQfI7WH/1L0JOmrJ5oV2Q2zcVIBrLh1K3ABZG73Z9nZ6', 'user', 'ROLE_USER');