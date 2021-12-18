/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server';
import apolloServerConfig from '@src/lib/config/apolloServerConfig';
import { CreateUserInput } from '@src/generated/type';
import prismaContext from '@src/lib/prisma/prismaContext';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      message
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      message
    }
  }
`;

export const ARCHIVED_USER_MUTATION = gql`
  mutation ArchivedUser($id: Int!) {
    archivedUser(id: $id) {
      message
    }
  }
`;

export const ASSIGN_USER_REVIEW_MUTATION = gql`
  mutation AssignUserReview($assignId: Int!, $reviewForId: Int!) {
    assignUserReview(assignId: $assignId, reviewForId: $reviewForId) {
      message
    }
  }
`;

describe('User mutation integration testing', () => {
  let server: ApolloServer;
  let preCreatedUser;
  let preCreatedUserTwo;
  let preCreatedUserThree;

  beforeAll(async () => {
    server = new ApolloServer(apolloServerConfig);
    preCreatedUser = await prismaContext.prisma.userModel.create({
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

    preCreatedUserThree = await prismaContext.prisma.userModel.create({
      data: {
        name: 'Allen',
      },
    });
  });

  afterAll(async () => {
    await prismaContext.prisma.$disconnect();
  });

  it('Successfully create user', async () => {
    const mockUser: CreateUserInput = {
      name: 'Jason',
      role: 'ADMIN',
    };

    const result = await server.executeOperation({
      query: CREATE_USER_MUTATION,
      variables: { input: mockUser },
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.createUser).toBeDefined();
    const res = result?.data?.createUser;
    expect(res.message).toBeDefined();
    expect(res.message).toBe('Successfully create user');
  });

  it('Successfully update user', async () => {
    const result = await server.executeOperation({
      query: UPDATE_USER_MUTATION,
      variables: {
        id: preCreatedUser.id,
        input: {
          name: 'Allen',
          role: 'STAFF',
        },
      },
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.updateUser).toBeDefined();
    const res = result?.data?.updateUser;
    expect(res.message).toBeDefined();
    expect(res.message).toBe('Successfully update user');

    const user = await prismaContext.prisma.userModel.findUnique({
      where: {
        id: preCreatedUser.id,
      },
    });

    expect(user?.name).toBe('Allen');
    expect(user?.role).toBe('STAFF');
  });

  it('Successfully archived user', async () => {
    const result = await server.executeOperation({
      query: ARCHIVED_USER_MUTATION,
      variables: {
        id: preCreatedUser.id,
      },
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.archivedUser).toBeDefined();
    const res = result?.data?.archivedUser;
    expect(res.message).toBeDefined();
    expect(res.message).toBe('Successfully archive user');

    const user = await prismaContext.prisma.userModel.findUnique({
      where: {
        id: preCreatedUser.id,
      },
    });

    expect(user?.archived).toBe(true);
  });

  it('Successfully assign user review task', async () => {
    const result = await server.executeOperation({
      query: ASSIGN_USER_REVIEW_MUTATION,
      variables: {
        assignId: preCreatedUserTwo.id,
        reviewForId: preCreatedUserThree.id,
      },
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.assignUserReview).toBeDefined();
    const res = result?.data?.assignUserReview;
    expect(res.message).toBeDefined();
    expect(res.message).toBe('Successfully create user review task');

    const task = await prismaContext.prisma.taskModel.findFirst({
      where: {
        assignedId: preCreatedUserTwo.id,
        reviewForId: preCreatedUserThree.id,
      },
    });

    expect(task).not.toBeNull();
  });
});
