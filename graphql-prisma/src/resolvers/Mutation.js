const Mutation = {
  createUser(_parent, args, { prisma }, info) {
    return prisma.mutation.createUser(
      {
        data: args.data
      },
      info
    );
  },
  deleteUser(_parent, args, { prisma }, info) {
    return prisma.mutation.deleteUser(
      {
        where: { id: args.id }
      },
      info
    );
  },
  updateUser(_parent, args, { prisma }, info) {
    return prisma.mutation.updateUser(
      {
        where: { id: args.id },
        data: args.data
      },
      info
    );
  },
  createPost(_parent, args, { prisma }, info) {
    return prisma.mutation.createPost(
      {
        data: args.data
      },
      info
    );
  },
  deletePost(_parent, args, { prisma }, info) {
    return prisma.mutation.deletePost(
      {
        where: { id: args.id }
      },
      info
    );
  },
  updatePost(_parent, args, { prisma }, info) {
    return prisma.mutation.updatePost(
      {
        where: { id: args.id },
        data: args.data
      },
      info
    );
  },
  createComment(_parent, args, { prisma }, info) {
    return prisma.mutation.createComment(
      {
        data: args.data
      },
      info
    );
  },
  deleteComment(_parent, args, { prisma }, info) {
    return prisma.mutation.deleteComment(
      {
        where: { id: args.id }
      },
      info
    );
  },
  updateComment(_parent, args, { prisma }, info) {
    return prisma.mutation.updateComment(
      {
        where: { id: args.id },
        data: args.data
      },
      info
    );
  }
};

export { Mutation as default };
