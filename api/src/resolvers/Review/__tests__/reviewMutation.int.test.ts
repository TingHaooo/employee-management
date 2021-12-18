/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server';
import apolloServerConfig from '@src/lib/config/apolloServerConfig';
import prismaContext from '@src/lib/prisma/prismaContext';

export const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      message
    }
  }
`;

export const UPDATE_REVIEW_MUTATION = gql`
  mutation UpdateReview($id: Int!, $input: UpdateReviewInput!) {
    updateReview(id: $id, input: $input) {
      message
    }
  }
`;

describe('Review mutation integration testing', () => {
  let server: ApolloServer;
  let preCreatedUserOne;
  let preCreatedUserTwo;
  beforeAll(async () => {
    server = new ApolloServer(apolloServerConfig);
    preCreatedUserOne = await prismaContext.prisma.userModel.create({
      data: {
        name: 'Jason',
        role: 'ADMIN',
      },
    });
    preCreatedUserTwo = await prismaContext.prisma.userModel.create({
      data: {
        name: 'Gina',
      },
    });
  });

  afterAll(async () => {
    await prismaContext.prisma.$disconnect();
  });

  it('Successfully create review', async () => {
    const input = {
      content: 'Nice',
      targetId: preCreatedUserOne.id,
      authorId: preCreatedUserTwo.id,
    };

    const result = await server.executeOperation({
      query: CREATE_REVIEW_MUTATION,
      variables: {
        input,
      },
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.createReview).toBeDefined();
    const res = result?.data?.createReview;
    expect(res.message).toBeDefined();
    expect(res.message).toBe('Successfully create review');
  });

  it('Successfully update review', async () => {
    const input = {
      content: 'Awesome',
    };

    const review = await prismaContext.prisma.reviewModel.create({
      data: {
        content: 'Nice',
        targetId: preCreatedUserOne.id,
        authorId: preCreatedUserTwo.id,
      },
    });

    const result = await server.executeOperation({
      query: UPDATE_REVIEW_MUTATION,
      variables: {
        id: review.id,
        input,
      },
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.updateReview).toBeDefined();
    const res = result?.data?.updateReview;
    expect(res.message).toBeDefined();
    expect(res.message).toBe('Successfully update review');
  });
});
