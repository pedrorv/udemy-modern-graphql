import { GraphQLServer } from "graphql-yoga";
import { DATA } from "./seed";
import { Query, Mutation, Comment, Post, User } from "./resolvers";

const db = {
  users: [...DATA.USERS],
  posts: [...DATA.POSTS],
  comments: [...DATA.COMMENTS]
};

const resolvers = { Query, Mutation, Comment, Post, User };

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db
  }
});

server.start(() => {
  console.log("The server is up on port 4000");
});
