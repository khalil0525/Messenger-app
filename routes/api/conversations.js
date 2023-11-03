const router = require("express").Router();
const {
  User,
  Conversation,
  Message,
  PinnedConversation,
} = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [[Message, "createdAt", "DESC"]],
      include: [
        { model: Message, order: ["createdAt", "DESC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];

      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      convoJSON.messages.reverse();
      // set properties for notification count and latest message preview
      convoJSON.latestMessageText =
        convoJSON.messages[convoJSON.messages.length - 1].text;
      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});
// Get pinned conversations for a user
router.get("/pinned", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (user) {
      const pinnedConversations = await PinnedConversation.findAll({
        where: {
          userId: userId,
        },
        attributes: ["conversationId"],
      });

      const conversationIds = pinnedConversations.map(
        (pc) => pc.conversationId
      );

      const conversations = await Conversation.findAll({
        where: {
          id: conversationIds,
          [Op.or]: {
            user1Id: userId,
            user2Id: userId,
          },
        },
        attributes: ["id"],
        order: [[Message, "createdAt", "DESC"]],
        include: [
          { model: Message, order: ["createdAt", "DESC"] },
          {
            model: User,
            as: "user1",
            where: {
              id: {
                [Op.not]: userId,
              },
            },
            attributes: ["id", "username", "photoUrl"],
            required: false,
          },
          {
            model: User,
            as: "user2",
            where: {
              id: {
                [Op.not]: userId,
              },
            },
            attributes: ["id", "username", "photoUrl"],
            required: false,
          },
        ],
      });

      const processedConversations = conversations.map((convo) => {
        const convoJSON = convo.toJSON();

        if (convoJSON.user1) {
          convoJSON.otherUser = convoJSON.user1;
          delete convoJSON.user1;
        } else if (convoJSON.user2) {
          convoJSON.otherUser = convoJSON.user2;
          delete convoJSON.user2;
        }

        if (onlineUsers.includes(convoJSON.otherUser.id)) {
          convoJSON.otherUser.online = true;
        } else {
          convoJSON.otherUser.online = false;
        }

        convoJSON.messages.reverse();
        convoJSON.latestMessageText =
          convoJSON.messages[convoJSON.messages.length - 1].text;

        return convoJSON;
      });

      res.json(processedConversations);
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/pin/:conversationId", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const userId = req.user.id;
    const conversationId = req.params.conversationId;

    const user = await User.findByPk(userId);
    const conversation = await Conversation.findByPk(conversationId);

    if (user && conversation) {
      await PinnedConversation.create({
        userId: user.id,
        conversationId: conversation.id,
      });

      res.sendStatus(200);
    } else {
      res.status(404).json({ error: "User or conversation not found." });
    }
  } catch (error) {
    next(error);
  }
});

// Remove a conversation from pinnedConversations
router.delete("/unpin/:conversationId", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const userId = req.user.id;
    const conversationId = req.params.conversationId;

    await PinnedConversation.destroy({
      where: {
        userId: userId,
        conversationId: conversationId,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

// Get pinned conversations for a user

module.exports = router;

module.exports = router;
