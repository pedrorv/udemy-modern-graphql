const Post = {
  author(parent, _args, { db }, _info) {
    return db.users.find(u => u.id === parent.author);
  },
  comments(parent, _args, { db }, _info) {
    return db.comments.filter(c => c.post === parent.id);
  }
};

export { Post as default };
