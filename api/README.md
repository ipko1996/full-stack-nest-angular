## Installation

```bash
$ pnpm install
```

```bash
pnpm dlx prisma generate
pnpm dlx prisma db push
```

## Seed the database (this will create admin user)
```bash
pnpm dlx prisma db seed
```

## Configuration

Copy the `.env.example` file to `.env` and fill in the necessary values.

### In case of using mongoDB with Docker or desktop

- I had problems doing this, so I had to use the mongoDB Atlas service.
- Could have used mongoose ofc, but I wanted to try Prisma with MongoDB.
- It has something to do with [MongoDB Replica Issue](https://github.com/prisma/prisma/issues/8266) (wasted hours with this trying to create a single docker-compose 🥲)


## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).
