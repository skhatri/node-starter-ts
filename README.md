#### node starter app

Shows todo tasks

### Progres Tracker Configuration

Following env variables can be provided

|Env Variable|Default Value|Description|
|---|---|---|
|DB_USER|postgres|username with access to tables such as tasks, actors|
|DB_NAME|postgres|name of the database where todo schema is hosted|
|DB_SCHEMA|executor|name of the schema for todo task tables|
|DB_PASSWORD|password|password for postgres user. Can be provided with the prefix "file:", if reading from file|
|DB_HOST|postgres|database host to connect to|
|DB_PORT|5432|database port to connect to|
|DB_CONNECTION_POOL_SIZE|3|database connection pool size|
|PORT|8080|Node application port|

#### Reading username/password from file

```
export DB_PASSWORD=file:./user.txt
npm run dev:serve
```

### Apis

The following REST apis are available

|Api|Description|
|---|---|
|http://0.0.0.0:8080/tasks| List Tasks |
|http://0.0.0.0:8080/actors| List Actor names |
|http://0.0.0.0:8080/actors/:actors| Show Actor name |
|http://0.0.0.0:8080/actors/:actor/tasks|List actor's tasks|

### build container
```
npm run build-image
```

