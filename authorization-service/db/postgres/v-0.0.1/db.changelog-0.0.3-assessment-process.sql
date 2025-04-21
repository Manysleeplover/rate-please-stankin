CREATE TABLE assessment (
                                id UUID PRIMARY KEY,
                                assessment_list jsonb not null,
                                daily_schedule_id UUID NOT NULL,
                                constraint fk_daily_schedule
                                    foreign key (daily_schedule_id)
                                        references daily_schedule (id)
                                        on delete cascade
);

CREATE TABLE passed_assessment
(
    id UUID primary key,
    assessment_id UUID NOT NULL,
    person_id bigserial NOT NULL,
    completion_percent int4 NOT NULL,
    constraint fk_assessment
        foreign key (assessment_id)
            references assessment (id)
            on delete cascade,
    constraint fk_person
        foreign key (person_id)
            references person (id)
            on delete cascade
);