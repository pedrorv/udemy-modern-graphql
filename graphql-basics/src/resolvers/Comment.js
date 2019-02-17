const Comment = {
  post(parent, _args, { db }, _info) {
    return db.posts.find(p => p.id === parent.post);
  },
  author(parent, _args, { db }, _info) {
    return db.users.find(u => u.id === parent.author);
  }
};

export { Comment as default };
