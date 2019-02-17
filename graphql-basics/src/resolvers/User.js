const User = {
  posts(parent, _args, { db }, _info) {
    return db.posts.filter(p => p.author === parent.id);
  },
  comments(parent, _args, { db }, _info) {
    return db.comments.filter(c => c.author === parent.id);
  }
};

export { User as default };
