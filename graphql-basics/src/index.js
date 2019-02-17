import { GraphQLServer, PubSub } from "graphql-yoga";
import { DATA } from "./seed";
import {
  Query,
  Mutation,
  Subscription,
  Comment,
  Post,
  User
} from "./resolvers";

const db = {
  users: [...DATA.USERS],
  posts: [...DATA.POSTS],
  comments: [...DATA.COMMENTS]
};

const resolvers = { Query, Mutation, Subscription, Comment, Post, User };
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db,
    pubsub
  }
});

server.start(() => {
  console.log("The server is up on port 4000");
});
