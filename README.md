# CRUD для загрузки файлов
## Description
CRUD для загрузки файлов на диск и базу данных с регистрацией пользователя.<br>

## ENV

Обязательные env для работы:
```
#MY_SQL
MY_SQL_HOST=
MY_SQL_PORT=
DB_USERNAME=
PASSWORD=
DB_NAME=

#SERVER
SERVER_PORT = 

#JWT
JWT_SECRET=
JWT_REFRESH_SECRET=
JWT_REFRESH_EXP=
JWT_EXP=
```


## Installation

```bash
$ npm install / npm ci
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```
## TODO
* Unit tests
* Better error handling
