# ImageView
An API for an image sharing platform.

## Installation

**Make sure are using Node 6+, NPM 5+ and MySQL 5.5+**

``` sh
cp .env.example .env

npm install

npm run db:migrate latest

npm run db:seed run
```

## Usage

``` sh
npm test # require database

npm start # prod env

npm run dev # dev env without Docker

npm run docker:up # dev env with Docker
```

## API reference

- Framework: [express](https://expressjs.com/en/4x/api.html)
- MySQL driver: [mysql](https://github.com/mysqljs/mysql#mysql)
- PostgreSQL driver: [pg](https://node-postgres.com)
- ORM: [tabel](http://tabel.fractaltech.in/)
- GraphQL server: [apollo-server-express](https://www.apollographql.com/docs/apollo-server)
- JSON Web Token: [jwt-simple](https://github.com/hokaccha/node-jwt-simple)
- Hash passwords: [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- Send mails: [nodemailer](https://nodemailer.com)
- Image processing: [sharp](http://sharp.pixelplumbing.com/en/stable/install)
- Fake data generator: [faker](https://github.com/marak/Faker.js)
- Linter: [eslint](https://eslint.org/docs/rules)
- Test runner: [ava](https://github.com/avajs/ava)
- Test coverage: [nyc](https://github.com/istanbuljs/nyc#nyc)
- Tests spies, stubs and mocks: [sinon](http://sinonjs.org/releases/v6.1.4)

## License

[MIT](https://github.com/Yasti4/imageview-api/src/master/LICENSE)