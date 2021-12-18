import { GraphQLResolveInfo } from 'graphql';
import { IApolloServerContext } from 'src/lib/interfaces/IApolloServerContext';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};






export type CreateReviewInput = {
  content: Scalars['String'];
  targetId: Scalars['Int'];
  authorId: Scalars['Int'];
};

export type CreateUserInput = {
  name: Scalars['String'];
  role: Role;
};

export type Mutation = {
  __typename?: 'Mutation';
  archivedUser?: Maybe<MutationResponse>;
  assignUserReview?: Maybe<MutationResponse>;
  createReview?: Maybe<MutationResponse>;
  createUser?: Maybe<MutationResponse>;
  updateReview?: Maybe<MutationResponse>;
  updateUser?: Maybe<MutationResponse>;
};


export type MutationArchivedUserArgs = {
  id: Scalars['Int'];
};


export type MutationAssignUserReviewArgs = {
  assignId: Scalars['Int'];
  reviewForId: Scalars['Int'];
};


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateReviewArgs = {
  id: Scalars['Int'];
  input: UpdateReviewInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  input: UpdateUserInput;
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  helloWorld: Scalars['String'];
  review?: Maybe<Review>;
  reviews?: Maybe<Array<Review>>;
  task?: Maybe<Task>;
  tasks?: Maybe<Array<Task>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryReviewArgs = {
  id: Scalars['Int'];
};


export type QueryTaskArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int'];
  content: Scalars['String'];
  targetId: Scalars['Int'];
  target: User;
  authorId: Scalars['Int'];
  author: User;
};

export type Role =
  | 'STAFF'
  | 'ADMIN';

export type Task = {
  __typename?: 'Task';
  id: Scalars['Int'];
  assignedId: Scalars['Int'];
  assigned: User;
  reviewForId: Scalars['Int'];
  reviewFor: User;
  completed: Scalars['Boolean'];
};

export type UpdateReviewInput = {
  content: Scalars['String'];
};

export type UpdateUserInput = {
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  role: Role;
  reviews?: Maybe<Array<Review>>;
  authorReviews?: Maybe<Array<Review>>;
  tasks?: Maybe<Array<Task>>;
  targetTasks?: Maybe<Array<Task>>;
};


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  CreateReviewInput: CreateReviewInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CreateUserInput: CreateUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<MutationResponse>;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  Role: Role;
  Task: ResolverTypeWrapper<Task>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  UpdateReviewInput: UpdateReviewInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  CreateReviewInput: CreateReviewInput;
  String: Scalars['String'];
  Int: Scalars['Int'];
  CreateUserInput: CreateUserInput;
  Mutation: {};
  MutationResponse: MutationResponse;
  Query: {};
  Review: Review;
  Task: Task;
  Boolean: Scalars['Boolean'];
  UpdateReviewInput: UpdateReviewInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
}>;

export type PermissionsDirectiveArgs = {   required?: Maybe<Array<Scalars['String']>>; };

export type PermissionsDirectiveResolver<Result, Parent, ContextType = IApolloServerContext, Args = PermissionsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MutationResolvers<ContextType = IApolloServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  archivedUser?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationArchivedUserArgs, 'id'>>;
  assignUserReview?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationAssignUserReviewArgs, 'assignId' | 'reviewForId'>>;
  createReview?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationCreateReviewArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  updateReview?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateReviewArgs, 'id' | 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>;
}>;

export type MutationResponseResolvers<ContextType = IApolloServerContext, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = IApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  helloWorld?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  review?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<QueryReviewArgs, 'id'>>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTaskArgs, 'id'>>;
  tasks?: Resolver<Maybe<Array<ResolversTypes['Task']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
}>;

export type ReviewResolvers<ContextType = IApolloServerContext, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  targetId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TaskResolvers<ContextType = IApolloServerContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  assignedId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  assigned?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  reviewForId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reviewFor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = IApolloServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  authorReviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<ResolversTypes['Task']>>, ParentType, ContextType>;
  targetTasks?: Resolver<Maybe<Array<ResolversTypes['Task']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = IApolloServerContext> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = IApolloServerContext> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = IApolloServerContext> = ResolversObject<{
  permissions?: PermissionsDirectiveResolver<any, any, ContextType>;
}>;


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = IApolloServerContext> = DirectiveResolvers<ContextType>;