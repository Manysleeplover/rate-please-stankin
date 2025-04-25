CREATE TABLE passed_test
(
  id UUID primary key,
  task_for_class_id UUID NOT NULL,
  person_id bigserial NOT NULL,
  completion_percent int4 NOT NULL,
  constraint fk_task_for_class
    foreign key (task_for_class_id)
    references task_for_class (id)
    on delete cascade,
  constraint fk_person
      foreign key (person_id)
          references person (id)
          on delete cascade
);

ALTER TABLE passed_test REPLICA IDENTITY FULL;