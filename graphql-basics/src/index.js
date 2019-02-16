import { GraphQLServer } from "graphql-yoga";
import { USERS, POSTS, COMMENTS } from "./seed";

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }
  
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
    comments(_parent, args, _ctx, _info) {
      if (!args.query) return COMMENTS;

      return COMMENTS.filter(c =>
        c.text.toLowerCase().includes(args.query.toLowerCase())
      );
    }
  },
  Post: {
    author(parent, _args, _ctx, _info) {
      return USERS.find(u => u.id === parent.author);
    },
    comments(parent, _args, _ctx, _info) {
      return COMMENTS.filter(c => c.post === parent.id);
    }
  },
  User: {
    posts(parent, _args, _ctx, _info) {
      return POSTS.filter(p => p.author === parent.id);
    },
    comments(parent, _args, _ctx, _info) {
      return COMMENTS.filter(c => c.author === parent.id);
    }
  },
  Comment: {
    post(parent, _args, _ctx, _info) {
      return POSTS.find(p => p.id === parent.post);
    },
    author(parent, _args, _ctx, _info) {
      return USERS.find(u => u.id === parent.author);
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
