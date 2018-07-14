
const faker = require('faker');

const timestamps = (deletedAt = true) => ({
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...(deletedAt ? { deletedAt: faker.random.arrayElement([null, faker.date.recent()]) } : {})
});

module.exports = {
  Album: () => ({
    id: faker.random.number(),
    title: faker.lorem.sentence(),
    description: faker.random.arrayElement([null, faker.lorem.sentences()]),
    ...timestamps()
  }),
  Comment: () => ({
    id: faker.random.number(),
    content: faker.lorem.sentences(),
    ...timestamps()
  }),
  File: () => ({
    id: faker.random.number(),
    filename: faker.system.fileName('png'),
    ...timestamps()
  }),
  Image: () => ({
    id: faker.random.number(),
    type: faker.random.arrayElement(['sm', 'md', 'lg']),
    width: faker.random.arrayElement([320, 640, 1024]),
    height: faker.random.arrayElement([320, 640, 1024])
  }),
  JWT: () => ({
    tokenType: 'Bearer',
    expiresIn: new Date(Date.now() * 12096e5),
    accessToken: faker.lorem.slug
  }),
  Post: () => ({
    id: faker.random.number(),
    description: faker.random.arrayElement([null, faker.lorem.sentences()]),
    visibility: faker.random.arrayElement(['public', 'protected', 'private']),
    enableComments: faker.random.boolean(),
    ...timestamps()
  }),
  Privacity: () => ({
    id: faker.random.number(),
    user_id: faker.random.number(),
    search: faker.random.arrayElement(['public', 'protected', 'private']),
    posts: faker.random.arrayElement(['public', 'protected', 'private']),
    albums: faker.random.arrayElement(['public', 'protected', 'private'])
  }),
  Role: () => ({
    name: faker.random.arrayElement(['admin', 'user'])
  }),
  Tag: () => ({
    id: faker.random.number(),
    name: faker.lorem.word()
  }),
  User: () => ({
    id: faker.random.number(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    role: faker.random.arrayElement(['admin', 'user']),
    ...timestamps()
  }),
  Visibility: () => ({
    name: faker.random.arrayElement(['public', 'protected', 'private'])
  })
};
