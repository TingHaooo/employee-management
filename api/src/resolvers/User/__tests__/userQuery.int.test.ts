/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server';
import apolloServerConfig from '@src/lib/config/apolloServerConfig';
import prismaContext from '@src/lib/prisma/prismaContext';

export const USER_QUERY = gql`
  query UserQuery($id: Int!) {
    user(id: $id) {
      id
      name
      role
    }
  }
`;

export const USERS_QUERY = gql`
  query UsersQuery {
    users {
      id
      name
      role
    }
  }
`;

describe('User query integration testing', () => {
  let server: ApolloServer;
  let preCreatedUser;
  let preCreatedArchivedUser;

  beforeAll(async () => {
    server = new ApolloServer(apolloServerConfig);
    preCreatedUser = await prismaContext.prisma.userModel.create({
      data: {
        name: 'Jason',
        role: 'ADMIN',
      },
    });
    preCreatedArchivedUser = await prismaContext.prisma.userModel.create({
      data: {
        name: 'Gina',
        role: 'STAFF',
        archived: true,
      },
    });
  });

  afterAll(async () => {
    await prismaContext.prisma.$disconnect();
  });

  it('Successfully query user', async () => {
    const result = await server.executeOperation({
      query: USER_QUERY,
      variables: {
        id: preCreatedUser.id,
      },
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.user).toBeDefined();
    const res = result?.data?.user;
    expect(res.name).toBe('Jason');
    expect(res.role).toBe('ADMIN');
  });

  it('Can not query archived user', async () => {
    const result = await server.executeOperation({
      query: USER_QUERY,
      variables: {
        id: preCreatedArchivedUser.id,
      },
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.user).toBeDefined();
    const res = result?.data?.user;
    expect(res).toBeNull();
  });

  it('Successfully query users', async () => {
    const result = await server.executeOperation({
      query: USERS_QUERY,
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.users).toBeDefined();
    const res = result?.data?.users;
    expect(res.length).toBeGreaterThan(1);
  });

  it('Can not query archived users', async () => {
    const result = await server.executeOperation({
      query: USERS_QUERY,
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.users).toBeDefined();
    const res = result?.data?.users;
    expect(res.filter(r => r.id === preCreatedArchivedUser.id)).toHaveLength(0);
  });
});
