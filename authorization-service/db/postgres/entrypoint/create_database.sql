CREATE SCHEMA user_credential_liquibase AUTHORIZATION user_credential_db_user;

DROP TABLE if EXISTS users CASCADE;
create table users
(
    id       bigserial primary key,
    email   varchar(255),
    password varchar(255),
    username varchar(255) unique,
    role varchar(16)
);
CREATE SEQUENCE user_id_seq START 1 INCREMENT 1;

DROP TABLE if EXISTS students CASCADE;
CREATE TABLE students
(
  id bigserial primary key,
  name varchar(127) not null,
  surname varchar(127) not null,
  patronymic varchar(127),
  student_group varchar(15),
  cardid numeric
);
CREATE SEQUENCE student_id_seq START 1 INCREMENT 1;



DROP TABLE if EXISTS semester_schedule CASCADE;
CREATE TABLE semester_schedule (
    id UUID PRIMARY KEY,                     -- Уникальный идентификатор
    first_class_date DATE NOT NULL,            -- Дата начала занятий
    last_class_date DATE NOT NULL,             -- Дата окончания занятий
    stgroup TEXT NOT NULL,                     -- Группа
    version_date TEXT,                         -- Версия (опционально)
    CONSTRAINT semester_schedule_unique_idx    -- Уникальный индекс
        UNIQUE (first_class_date, last_class_date, stgroup, version_date)
);

CREATE TABLE daily_schedule (
    id UUID PRIMARY KEY,                     -- Уникальный идентификатор
    date DATE NOT NULL,                        -- Дата
    stgroup TEXT,                              -- Группа (опционально)
    subject TEXT,                              -- Предмет (опционально)
    audience TEXT NOT NULL,                    -- Аудитория
    start_time TEXT,                           -- Время начала (опционально)
    end_time TEXT,                             -- Время окончания (опционально)
    subgroup TEXT,                           -- Группа (опционально)
    teacher TEXT,                              -- Преподаватель (опционально)
    type TEXT,                                 -- Тип занятия (опционально)
    semester_schedule_id UUID NOT NULL,         -- Ссылка на semester_schedule
    CONSTRAINT fk_semester_schedule            -- Внешний ключ
        FOREIGN KEY (semester_schedule_id)
            REFERENCES semester_schedule (id)
            ON DELETE CASCADE
);

CREATE INDEX idx_daily_schedule_date           -- Индекс по дате
    ON daily_schedule (date);