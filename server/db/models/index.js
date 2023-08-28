const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const FriendRequest = require("./friendRequest");
const Friend = require("./friend");
// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

// User.hasMany(Friend);
// User.hasMany(FriendRequest, { as: "user1" });

module.exports = {
  User,
  Conversation,
  Message,
};
