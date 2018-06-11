# ImageView
An API for an image sharing platform.

## Installation

**Make sure are using Node 8+, NPM 5+ and MySQL 5.5+**

``` sh
cp .env.example .env

npm install

npm run db:create

npm run migrate

npm run db:seed # Only dev enviroment
```

## Usage

``` sh
npm run serve # Only dev environment without Docker

npm run dev # Only dev enviroment with Docker

npm start # Only prod enviroment
```

## License

[MIT](https://github.com/Yasti4/imageview-api/src/master/LICENSE)