import path from 'path';

import { DocumentNode } from 'graphql';
import { loadTypedefsSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';

import resolvers from '@src/resolvers';

const typeDefs = loadTypedefsSync(path.join(__dirname, '../../schema/*.gql'), {
  loaders: [new GraphQLFileLoader()],
})
  .map(e => e.document)
  .filter((e): e is DocumentNode => e !== undefined);

const schemaWithResolvers = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers,
});

export default schemaWithResolvers;
