import { UserModel } from '.prisma/client';
import {
  QueryResolvers,
  Task as TaskType,
  TaskResolvers,
} from '@src/generated/type';

export const Query: QueryResolvers = {
  tasks: async (_p, _a, { prismaContext: { prisma } }) => {
    const tasks = await prisma.taskModel.findMany({});
    return tasks as TaskType[];
  },
  task: async (_p, { id }, { prismaContext: { prisma } }) => {
    const task = await prisma.taskModel.findUnique({
      where: {
        id,
      },
    });
    return task as TaskType;
  },
};

export const Task: TaskResolvers = {
  assigned: async ({ id }, _a, { prismaContext: { prisma } }) => {
    const user = await prisma.taskModel
      .findUnique({
        where: {
          id,
        },
      })
      .assigned();
    return user as UserModel;
  },
  reviewFor: async ({ id }, _a, { prismaContext: { prisma } }) => {
    const user = await prisma.taskModel
      .findUnique({
        where: {
          id,
        },
      })
      .reviewFor();
    return user as UserModel;
  },
};
