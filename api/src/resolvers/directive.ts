import {
  DirectiveResolvers,
  PermissionsDirectiveResolver,
} from '@src/generated/type';
import roleToPermissions from '@src/lib/roleToPermission';

const permissions: PermissionsDirectiveResolver<any, any> = async (
  next,
  _,
  { required },
  { user },
  { fieldName, returnType, parentType }
) => {
  if (!user?.role) throw new Error('Unauthorized Error');
  if (!required?.length) return await next();

  let noPermissions = false;
  for (let i = 0; i < required.length; ++i) {
    if (!roleToPermissions[user?.role].includes(required[i])) {
      noPermissions = true;
      break;
    }
  }

  if (noPermissions) {
    throw new Error('Forbidden Error');
  }
  return await next();
};

const directiveResolvers: DirectiveResolvers = {
  permissions,
};

export default directiveResolvers;
