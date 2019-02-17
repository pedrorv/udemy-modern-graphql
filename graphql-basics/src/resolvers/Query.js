const Query = {
  users(_parent, args, { db }, _info) {
    if (!args.query) return db.users;

    return db.users.filter(u =>
      u.name.toLowerCase().includes(args.query.toLowerCase())
    );
  },
  me(_parent, _args, { db }, _info) {
    return db.users[0];
  },
  posts(_parent, args, { db }, _info) {
    if (!args.query) return db.posts;

    return db.posts.filter(
      p =>
        p.title.toLowerCase().includes(args.query.toLowerCase()) ||
        p.body.toLowerCase().includes(args.query.toLowerCase())
    );
  },
  comments(_parent, args, { db }, _info) {
    if (!args.query) return db.comments;

    return db.comments.filter(c =>
      c.text.toLowerCase().includes(args.query.toLowerCase())
    );
  }
};

export { Query as default };
