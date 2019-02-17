import { GraphQLServer } from "graphql-yoga";
import {
  USERS,
  POSTS,
  COMMENTS,
  createUser,
  createPost,
  createComment
} from "./seed";

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int!): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    createComment(text: String!, author: ID!, post: ID!): Comment!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
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
  Mutation: {
    createUser(_parent, args, _ctx, _info) {
      const { name, email, age } = args;
      const emailTaken = USERS.some(u => u.email === email);
      if (emailTaken) {
        throw new Error("Email already taken.");
      }

      const user = createUser(name, email, age);
      USERS.push(user);

      return user;
    },
    createPost(_parent, args, _ctx, _info) {
      const { title, body, published, author } = args;
      const userExists = USERS.some(u => u.id === author);

      if (!userExists) throw new Error("User doesn't exist.");

      const post = createPost(title, body, published, author);
      POSTS.push(post);

      return post;
    },
    createComment(_parent, args, _ctx, _info) {
      const { text, author, post } = args;
      const userExists = USERS.some(u => u.id === author);
      const postExists = POSTS.some(p => p.id === post);

      if (!userExists) throw new Error("User doesn't exist.");
      if (!postExists) throw new Error("Post doesn't exist.");

      const comment = createComment(text, author, post);
      COMMENTS.push(comment);

      return comment;
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
