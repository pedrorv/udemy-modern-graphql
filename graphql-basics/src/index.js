import { GraphQLServer } from "graphql-yoga";
import { DATA, createUser, createPost, createComment } from "./seed";

let USERS = [...DATA.USERS];
let POSTS = [...DATA.POSTS];
let COMMENTS = [...DATA.COMMENTS];

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput): Post!
    deletePost(id: ID!): Post!
    createComment(data: CreateCommentInput): Comment!
    deleteComment(id: ID!): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int!
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
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
      const { name, email, age } = args.data;
      const emailTaken = USERS.some(u => u.email === email);
      if (emailTaken) throw new Error("Email already taken.");

      const user = createUser(name, email, age);
      USERS.push(user);

      return user;
    },
    deleteUser(_parent, args, _ctx, _info) {
      const { id } = args;
      const user = USERS.find(u => u.id === id);
      if (!user) throw new Error("User doesn't exist.");

      USERS = USERS.filter(u => u.id !== id);
      POSTS = POSTS.filter(p => p.author !== id);
      COMMENTS = COMMENTS.filter(c => c.author !== id);

      return user;
    },
    createPost(_parent, args, _ctx, _info) {
      const { title, body, published, author } = args.data;
      const userExists = USERS.some(u => u.id === author);

      if (!userExists) throw new Error("User doesn't exist.");

      const post = createPost(title, body, published, author);
      POSTS.push(post);

      return post;
    },
    deletePost(_parent, args, _ctx, _info) {
      const { id } = args;
      const post = POSTS.find(p => p.id === id);
      if (!post) throw new Error("Post doesn't exist.");

      POSTS = POSTS.filter(p => p.id !== id);
      COMMENTS = COMMENTS.filter(c => c.post !== id);

      return post;
    },
    createComment(_parent, args, _ctx, _info) {
      const { text, author, post } = args.data;
      const userExists = USERS.some(u => u.id === author);
      const postExists = POSTS.some(p => p.id === post);

      if (!userExists) throw new Error("User doesn't exist.");
      if (!postExists) throw new Error("Post doesn't exist.");

      const comment = createComment(text, author, post);
      COMMENTS.push(comment);

      return comment;
    },
    deleteComment(_parent, args, _ctx, _info) {
      const { id } = args;
      const comment = COMMENTS.find(p => p.id === id);
      if (!comment) throw new Error("Comment doesn't exist.");

      COMMENTS = COMMENTS.filter(p => p.id !== id);

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
