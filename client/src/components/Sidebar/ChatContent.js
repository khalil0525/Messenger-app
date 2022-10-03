import React, { useMemo } from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  boldPreviewText: {
    color: "black",
    fontWeight: "600",
  },
  badgeRoot: {
    alignSelf: "center",
    marginRight: 40,
  },
  badgeInner: {
    backgroundColor: "#3F92FF",
    color: "#fff",
  },
}));

const ChatContent = ({ conversation }) => {
  const classes = useStyles();

  const { otherUser } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;

  const hasUnreadMessages =
    conversation.messages[conversation.messages.length - 1]?.senderId ===
      otherUser.id &&
    !conversation.messages[conversation.messages.length - 1]?.isRead;

  const countUnreadMessages = useMemo(() => {
    if (hasUnreadMessages) {
      return conversation.messages.filter((message) => !message.isRead).length;
    } else {
      return 0;
    }
  }, [conversation.messages, hasUnreadMessages]);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={`${hasUnreadMessages && classes.boldPreviewText} ${
            classes.previewText
          }`}
        >
          {latestMessageText}
        </Typography>
      </Box>
      <Badge
        badgeContent={countUnreadMessages}
        classes={{ root: classes.badgeRoot, badge: classes.badgeInner }}
      />
    </Box>
  );
};

export default ChatContent;
