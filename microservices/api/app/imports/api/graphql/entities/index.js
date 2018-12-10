import UserType from "./User.graphql";
import UserResolver from "./User.resolver.js";
import StoryType from "./Story.graphql";

const typeDefs = [UserType, StoryType];

const resolvers = [UserResolver];

export { typeDefs, resolvers };
