import faker from "faker";

const TOTAL_USERS = faker.random.number({ min: 15, max: 50 });
const TOTAL_POSTS = faker.random.number({ min: 100, max: 250 });
const TOTAL_COMMENTS = faker.random.number({ min: 250, max: 500 });

const createUser = (name = null, email = null, age = null) => ({
  id: faker.random.uuid(),
  name: name || `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: email || faker.internet.email().toLowerCase(),
  age: age || faker.random.number({ min: 18, max: 100 })
});

const createPost = (
  title = null,
  body = null,
  published = null,
  author = null
) => ({
  id: faker.random.uuid(),
  title: title || faker.lorem.sentence(),
  body: body || faker.lorem.text(),
  published:
    typeof published === "boolean"
      ? published
      : faker.random.number({ min: 0, max: 9 }) % 2 === 0,
  author:
    author || USERS[faker.random.number({ min: 0, max: TOTAL_USERS - 1 })].id
});

const createComment = (text = null, author = null, post = null) => ({
  id: faker.random.uuid(),
  text: text || faker.lorem.text(),
  author:
    author || USERS[faker.random.number({ min: 0, max: TOTAL_USERS - 1 })].id,
  post: post || POSTS[faker.random.number({ min: 0, max: TOTAL_POSTS - 1 })].id
});

let USERS = [...Array(TOTAL_USERS).keys()].map(() => createUser());
let POSTS = [...Array(TOTAL_POSTS).keys()].map(() => createPost());
let COMMENTS = [...Array(TOTAL_COMMENTS).keys()].map(() => createComment());

export { USERS, POSTS, COMMENTS, createUser, createPost, createComment };
