import apolloServerContext from '@src/lib/config/apolloServerContext';
import schema from '@src/lib/config/apolloServerSchema';

const apolloServerConfig = {
  schema,
  // playground: process.env.NODE_ENV !== 'production',
  context: apolloServerContext,
};

export default apolloServerConfig;
