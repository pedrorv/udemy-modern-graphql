const Subscription = {
  comment: {
    subscribe(_parent, args, { db, pubsub }, _info) {
      const { postId } = args;
      const post = db.posts.find(p => p.id === postId && p.published);
      if (!post) throw new Error("Post doesn't exist.");

      return pubsub.asyncIterator(`post-${postId}-comments`);
    }
  },
  post: {
    subscribe(_parent, _args, { pubsub }, _info) {
      return pubsub.asyncIterator(`posts`);
    }
  }
};

export { Subscription as default };
