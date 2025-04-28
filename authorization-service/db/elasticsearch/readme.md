Статья описывающая debezium - https://medium.com/@cagataygokcel/real-time-data-streaming-from-postgresql-to-elasticsearch-via-kafka-and-debezium-b624b43cadb
https://dev.to/csar_fabinchvezlinar/building-real-time-data-pipelines-with-debezium-and-kafka-a-practical-guide-4mfg



1.Запуск elasticsearch:
```shell
docker-compose -f docker-compose-elasticsearch.yml up -d
```

```shell
POST http://localhost:8085/connectors
Content-Type: application/json

{
  "name": "sample-connector",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.hostname": "localhost",
    "database.port": "5433",
    "database.user": "user_credential_db_user",
    "database.password": "master",
    "database.dbname": "user_credential_db",
    "database.server.name": "user_credential_pg",
    "table.include.list": "public.passed_assessment, public.passed_test",
    "topic.prefix": "public.passed_test, public.passed_test",
    "plugin.name": "pgoutput",
    "slot.name": "debezium_slot",
    "schema.include.list": "public",
    "transforms.reroute_topic.type": "io.debezium.transforms.ByLogicalTableRouter",
    "transforms.reroute_topic.key.enforce.uniqueness": "false",
    "transforms.reroute_topic.topic.regex": "sample_reroute_source_topic",
    "transforms.reroute_topic.topic.replacement": "sample_reroute_target_topic",
    "transforms": "unwrap,reroute_topic",
    "transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState",
    "transforms.unwrap.drop.tombstones": "false",
    "key.converter": "org.apache.kafka.connect.json.JsonConverter",
    "key.converter.schemas.enable": "false",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "value.converter.schemas.enable": "false",
    "snapshot.mode": "initial",
    "decimal.format": "NUMERIC",
    "json.output.decimal.format": "NUMERIC",
    "decimal.handling.mode": "string"
  }
}
```

Добить - 

{
"name": "custom-query-connector",
"config": {
"connector.class": "io.debezium.connector.postgresql.PostgresConnector",
"database.hostname": "postgres",
"database.port": "5432",
"database.user": "debezium",
"database.password": "dbz_pass",
"database.dbname": "school_db",
"query.mode": "custom",
"custom.query.tables": "public.passed_assessment,public.passed_test",
"custom.query.passed_assessment": "SELECT id, assessment_id, (estimates->>'score')::int as score FROM passed_assessment WHERE deleted_at IS NULL",
"custom.query.passed_test": "SELECT id, task_for_class_id, completion_percent as score FROM passed_test WHERE is_active = true",
"topic.prefix": "school_custom"
}
}