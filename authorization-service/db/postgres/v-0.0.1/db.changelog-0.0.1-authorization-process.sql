DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users
(
    id       bigserial primary key,
    email    varchar(255),
    username varchar(255) unique,
    password varchar(255),
    role     varchar(16),
    person_id bigint UNIQUE -- Добавляем связь один-к-одному
);
CREATE SEQUENCE user_id_seq START 1 INCREMENT 1;

DROP TABLE IF EXISTS person CASCADE;
CREATE TABLE person
(
    id              bigserial primary key,
    name            varchar(127) not null,
    surname         varchar(127) not null,
    patronymic      varchar(127),
    student_group   varchar(15),
    cardid          numeric,
    personnel_number NUMERIC,
    member_type     CHAR(1),
    user_id         bigint UNIQUE REFERENCES users(id) -- Обратная связь
);
CREATE SEQUENCE student_id_seq START 1 INCREMENT 1;

-- Добавляем внешний ключ после создания обеих таблиц
ALTER TABLE users
    ADD CONSTRAINT fk_user_person
        FOREIGN KEY (person_id) REFERENCES person(id);