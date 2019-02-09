import UserType from "./User.graphql";
import UserResolver from "./User.resolver.js";
import StoryType from "./Story.graphql";
import FileType from "./File.graphql"

const typeDefs = [UserType, StoryType, FileType];

const resolvers = [UserResolver];

export { typeDefs, resolvers };
