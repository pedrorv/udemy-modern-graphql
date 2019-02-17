import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma-blog.graphql",
  endpoint: "http://localhost:4466",
  secret: "prismasecret"
});

export { prisma as default };
