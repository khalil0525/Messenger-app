const db = require("../db");

const pinnedConversation = db.define("PinnedConversation", {});

module.exports = pinnedConversation;
