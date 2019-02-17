import { GraphQLServer } from "graphql-yoga";
import {
  Query,
  Mutation,
  Subscription,
  Comment,
  Post,
  User
} from "./resolvers";
import prisma from "./prisma";

const resolvers = { Query, Mutation, Subscription, Comment, Post, User };

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});

server.start(() => {
  console.log("The server is up on port 4000");
});
