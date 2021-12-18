import schema from '@src/lib/config/apolloServerSchema';
import prismaContext from '@src/lib/prisma/prismaContext';

const apolloServerConfig = {
  schema,
  // playground: process.env.NODE_ENV !== 'production',
  context: async ({ req }) => {
    // 因為沒有實踐註冊登錄，Token 先直接使用 ID 不加密
    const token = req.headers.authorization || '';
    const user = await prismaContext.prisma.userModel.findUnique({
      where: {
        id: parseInt(token),
      },
    });

    return { prismaContext, user };
  },
};

export default apolloServerConfig;
