import faker from "faker";

const TOTAL_USERS = faker.random.number({ min: 15, max: 50 });
const TOTAL_POSTS = faker.random.number({ min: 100, max: 250 });
const TOTAL_COMMENTS = faker.random.number({ min: 250, max: 500 });

const createUser = () => ({
  id: faker.random.uuid(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email().toLowerCase(),
  age: faker.random.number({ min: 18, max: 100 })
});

const createPost = () => ({
  id: faker.random.uuid(),
  title: faker.lorem.sentence(),
  body: faker.lorem.text(),
  published: faker.random.number({ min: 0, max: 99 }) % 2 === 0,
  author: USERS[faker.random.number({ min: 0, max: TOTAL_USERS - 1 })].id
});

const createComment = () => ({
  id: faker.random.uuid(),
  text: faker.lorem.text(),
  author: USERS[faker.random.number({ min: 0, max: TOTAL_USERS - 1 })].id,
  post: POSTS[faker.random.number({ min: 0, max: TOTAL_POSTS - 1 })].id
});

const USERS = [...Array(TOTAL_USERS).keys()].map(createUser);
const POSTS = [...Array(TOTAL_POSTS).keys()].map(createPost);
const COMMENTS = [...Array(TOTAL_COMMENTS).keys()].map(createComment);

export { USERS, POSTS, COMMENTS };
