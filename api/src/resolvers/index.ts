import path from 'path';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const helloWorldResolver = {
  Query: {
    helloWorld(): string {
      return `👋 Hello world! 👋`;
    },
  },
};

const resolvers = loadFilesSync(path.join(__dirname, './*/resolver.[jt]s'));
const mergedResolvers = mergeResolvers([...resolvers, helloWorldResolver]);

export default mergedResolvers;
