# LIBROOKS
It is the REST API of our library's online store service, it is in charge of managing store data, books, genres, customers, etc.
## Installation
To install the project, we need to have installed the next:
- Node.js 🟢
- Docker and Docker-compose 🐋

If you don't have Node.js installed, you can install the latest version [here](https://nodejs.org/es/)

If you don't have Docker installed, you can install it [following the Docker documentation](https://docs.docker.com/engine/install/)

<blockquote>
<span>
💡
</span>
<span>
If you install Docker Desktop (on Windows and Mac), it comes with docker compose, but if you install it on Linux you must install it separately.
</span>
</blockquote>

#### Step 1
Clone the project
```bash
$ git clone https://github.com/cdlavila/librooks
```

#### Step 2
Duplicate the `.env.example` file and rename it to `.env`. Then, put your environment variables there.

#### Step 3
Raise the Docker containers, for this you have to run the following command in the terminal, being in the project path.
```bash
$ docker-compose up -d
```
The above command will build a network with the necessary containers for the project to run: mysql and redis.

#### Step 4
Install dependencies

```bash
$ npm install
```

#### Step 5
Run migrations

```bash
$ npm run migrations:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
