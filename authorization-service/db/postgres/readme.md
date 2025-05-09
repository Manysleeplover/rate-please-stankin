1. Запуск БД:
```shell
docker-compose -f docker-compose.yaml up -d
```

```shell
liquibase --liquibase-schema-name=user_credential_liquibase --schema-name=public --changeLogFile=db.changelog-master.yaml --url=jdbc:postgresql://localhost:5432/user_credential_db --username=user_credential_db_user --password=master update
```