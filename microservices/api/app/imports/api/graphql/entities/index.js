import UserType from "./User.graphql";
import UserResolver from "./User.resolver.js";
import StoryType from "./Story.graphql";
import FileType from "./File.graphql"
import ChatMessageType from './ChatMessage.graphql';
import ChatRoomType from './ChatRoom.graphql';

const typeDefs = [UserType, StoryType, FileType, ChatRoomType, ChatMessageType];

const resolvers = [UserResolver];

export { typeDefs, resolvers };
