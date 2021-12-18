import {
  MutationResolvers,
  QueryResolvers,
  Review,
  Task,
  UserResolvers,
  Role,
} from '@src/generated/type';

interface UpdateUserData {
  name?: string;
  role?: Role;
}

export const Mutation: MutationResolvers = {
  createUser: async (_p, { input }, { prismaContext: { prisma } }) => {
    const res = await prisma.userModel.create({
      data: input,
    });
    return {
      message: 'Successfully create user',
    };
  },
  updateUser: async (_p, { id, input }, { prismaContext: { prisma } }) => {
    const updateData: UpdateUserData = {};

    if (input.name) updateData.name = input.name;
    if (input.role) updateData.role = input.role;
    await prisma.userModel.update({
      where: {
        id,
      },
      data: updateData,
    });
    return {
      message: 'Successfully update user',
    };
  },
  archivedUser: async (_p, { id }, { prismaContext: { prisma } }) => {
    await prisma.userModel.update({
      where: {
        id,
      },
      data: {
        archived: true,
      },
    });
    return {
      message: 'Successfully archive user',
    };
  },
  assignUserReview: async (
    _p,
    { assignId, reviewForId },
    { prismaContext: { prisma } }
  ) => {
    await prisma.taskModel.create({
      data: {
        assignedId: assignId,
        reviewForId,
        completed: false,
      },
    });
    return {
      message: 'Successfully create user review task',
    };
  },
};

export const Query: QueryResolvers = {
  users: async (_p, _a, { prismaContext: { prisma } }) => {
    const users = await prisma.userModel.findMany({
      where: {
        archived: false,
      },
    });
    return users;
  },
  user: async (_p, { id }, { prismaContext: { prisma } }) => {
    const user = await prisma.userModel.findFirst({
      where: {
        id,
        archived: false,
      },
    });
    return user;
  },
};

export const User: UserResolvers = {
  reviews: async ({ id }, _, { prismaContext: { prisma } }) => {
    const reviews = await prisma.userModel
      .findUnique({
        where: {
          id,
        },
      })
      .reviews();
    return reviews as Review[];
  },
  authorReviews: async ({ id }, a, { prismaContext: { prisma } }) => {
    const reviews = await prisma.userModel
      .findUnique({
        where: {
          id,
        },
      })
      .authorReviews();
    return reviews as Review[];
  },
  tasks: async ({ id }, a, { prismaContext: { prisma } }) => {
    const tasks = await prisma.userModel
      .findUnique({
        where: {
          id,
        },
      })
      .tasks();
    return tasks as Task[];
  },
  targetTasks: async ({ id }, a, { prismaContext: { prisma } }) => {
    const tasks = await prisma.userModel
      .findUnique({
        where: {
          id,
        },
      })
      .targetTasks();
    return tasks as Task[];
  },
};
