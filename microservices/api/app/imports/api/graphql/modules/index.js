import Users from "./users.graphql";
import Stories from "./stories.graphql";
import StoriesResolvers from "./stories.resolvers";
import UsersResolvers from "./users.resolvers.js";

const typeDefs = [Users, Stories];
const resolvers = [UsersResolvers, StoriesResolvers];

export { typeDefs, resolvers };
