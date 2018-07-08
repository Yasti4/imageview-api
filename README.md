# ImageView
An API for an image sharing platform.

## Installation

**Make sure are using Node 8+, NPM 5+ and MySQL 5.5+**

``` sh
cp .env.example .env

npm install

npm run db:migrate latest

npm run db:seed

npm run build # Only prod environment
```

## Usage

``` sh
npm test # Only test environment

npm start # Only dev and prod environment
```

## License

[MIT](https://github.com/Yasti4/imageview-api/src/master/LICENSE)