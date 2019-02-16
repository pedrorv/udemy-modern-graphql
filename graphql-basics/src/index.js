import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
  type Query {
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
    me() {
      return {
        id: "123abc",
        name: "John Doe",
        email: "johndoe@gmail.com",
        age: 42
      };
    },
    post() {
      return {
        id: "1234abcd",
        title: "Hello, GraphQL",
        body: "I'm a post!",
        published: false
      };
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
