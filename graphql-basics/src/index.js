import { GraphQLServer } from "graphql-yoga";
import faker from "faker";

const TOTAL_USERS = faker.random.number({ min: 5, max: 15 });
const TOTAL_POSTS = faker.random.number({ min: 15, max: 25 });

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
  published: faker.random.number({ min: 0, max: 99 }) % 2 === 0
});

const USERS = [...Array(TOTAL_USERS).keys()].map(createUser);
const POSTS = [...Array(TOTAL_POSTS).keys()].map(createPost);

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
  
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

const resolvers = {
  Query: {
    users(_parent, args, _ctx, _info) {
      if (!args.query) return USERS;

      return USERS.filter(u =>
        u.name.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    me() {
      return USERS[0];
    },
    posts(_parent, args, _ctx, _info) {
      if (!args.query) return POSTS;

      return POSTS.filter(
        p =>
          p.title.toLowerCase().includes(args.query.toLowerCase()) ||
          p.body.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    post() {
      return POSTS[0];
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up on port 4000");
});
