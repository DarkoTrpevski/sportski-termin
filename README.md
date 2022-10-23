<p>
  NestJS App - Skeleton
</p>
## Running the app

## Technologies used:

```bash
* Prisma (ORM)
* Passport / Passport-JWT
* PostgreSQL
* Argon2 / class-validator / class-transformer for manipulating /validating data
* Pactum and Jest for e2e testing
```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Running the app

```bash
# development
$ npm run start

# To run the dev backend
$ npm run db:dev:up

# To stop the dev backend
$ npm run db:dev:rm

# To restart the dev backend
$ npm run db:dev:restart

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migrations

```bash
# To create a migration based if there is a change in schema.prisma
$ npm run prisma:migrate:create

# To deploy the migrations
$ npm run prisma:dev:deploy

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# e2e tests with db restart before that
$ npm run pretest:e2e

# test coverage
$ npm run test:cov
```
