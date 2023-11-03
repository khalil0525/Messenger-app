const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const FriendRequest = require("./friendRequest");
const Friend = require("./friend");
const PinnedConversation = require("./pinnedConversation"); // Add this line

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

User.belongsToMany(Conversation, { through: PinnedConversation }); // New association
Conversation.belongsToMany(User, { through: PinnedConversation }); // New association

module.exports = {
  User,
  Conversation,
  Message,
  PinnedConversation, // Add this line
};
