import { UserModel } from '.prisma/client';
import { IPrismaContext } from '@src/lib/interfaces/IPrismaContext';

export interface IApolloServerContext {
  user?: UserModel;
  prismaContext: IPrismaContext;
}
