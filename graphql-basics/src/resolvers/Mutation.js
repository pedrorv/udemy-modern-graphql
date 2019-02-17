import { createUser, createPost, createComment } from "../seed";

const Mutation = {
  createUser(_parent, args, { db }, _info) {
    const { name, email, age } = args.data;
    const emailTaken = db.users.some(u => u.email === email);
    if (emailTaken) throw new Error("Email already taken.");

    const user = createUser(name, email, age);
    db.users.push(user);

    return user;
  },
  deleteUser(_parent, args, { db }, _info) {
    const { id } = args;
    const user = db.users.find(u => u.id === id);
    if (!user) throw new Error("User doesn't exist.");

    db.users = db.users.filter(u => u.id !== id);
    db.posts = db.posts.filter(p => {
      const shouldDelete = p.author === id;

      if (shouldDelete) {
        db.comments = db.comments.filter(c => c.post !== p.id);
      }

      return !shouldDelete;
    });
    db.comments = db.comments.filter(c => c.author !== id);

    return user;
  },
  createPost(_parent, args, { db }, _info) {
    const { title, body, published, author } = args.data;
    const userExists = db.users.some(u => u.id === author);

    if (!userExists) throw new Error("User doesn't exist.");

    const post = createPost(title, body, published, author);
    db.posts.push(post);

    return post;
  },
  deletePost(_parent, args, { db }, _info) {
    const { id } = args;
    const post = db.posts.find(p => p.id === id);
    if (!post) throw new Error("Post doesn't exist.");

    db.posts = db.posts.filter(p => p.id !== id);
    db.comments = db.comments.filter(c => c.post !== id);

    return post;
  },
  createComment(_parent, args, { db }, _info) {
    const { text, author, post } = args.data;
    const userExists = db.users.some(u => u.id === author);
    const postExists = db.posts.some(p => p.id === post);

    if (!userExists) throw new Error("User doesn't exist.");
    if (!postExists) throw new Error("Post doesn't exist.");

    const comment = createComment(text, author, post);
    db.comments.push(comment);

    return comment;
  },
  deleteComment(_parent, args, { db }, _info) {
    const { id } = args;
    const comment = db.comments.find(p => p.id === id);
    if (!comment) throw new Error("Comment doesn't exist.");

    db.comments = db.comments.filter(p => p.id !== id);

    return comment;
  }
};

export { Mutation as default };
