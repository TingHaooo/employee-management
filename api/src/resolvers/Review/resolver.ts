import { UserModel } from '.prisma/client';
import {
  QueryResolvers,
  ReviewResolvers,
  Review as ReviewType,
  MutationResolvers,
} from '@src/generated/type';

export const Mutation: MutationResolvers = {
  createReview: async (_p, { input }, { prismaContext: { prisma } }) => {
    await prisma.reviewModel.create({
      data: input,
    });
    return {
      message: 'Successfully create review',
    };
  },
  updateReview: async (_p, { id, input }, { prismaContext: { prisma } }) => {
    await prisma.reviewModel.update({
      where: {
        id,
      },
      data: input,
    });
    return {
      message: 'Successfully update review',
    };
  },
};

export const Query: QueryResolvers = {
  reviews: async (_p, _a, { prismaContext: { prisma } }) => {
    const reviews = await prisma.reviewModel.findMany({});
    return reviews as ReviewType[];
  },
  review: async (_p, { id }, { prismaContext: { prisma } }) => {
    const review = await prisma.reviewModel.findUnique({
      where: {
        id,
      },
    });
    return review as ReviewType;
  },
};

export const Review: ReviewResolvers = {
  target: async ({ id }, _a, { prismaContext: { prisma } }) => {
    const user = await prisma.reviewModel
      .findUnique({
        where: {
          id,
        },
      })
      .target();
    return user as UserModel;
  },
  author: async ({ id }, _a, { prismaContext: { prisma } }) => {
    const user = await prisma.reviewModel
      .findUnique({
        where: {
          id,
        },
      })
      .author();
    return user as UserModel;
  },
};
