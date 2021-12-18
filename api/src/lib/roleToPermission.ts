type RoleToPermissions = Record<string, string[]>;

const roleToPermissions: RoleToPermissions = {
  ADMIN: [
    'queryUsers',
    'queryUser',
    'createUser',
    'updateUser',
    'archivedUser',
    'assignUserReview',
    'queryReviews',
    'queryReview',
  ],
  STAFF: [],
};

export default roleToPermissions;
