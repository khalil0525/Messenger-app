import React, { useMemo } from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 0,
    overflowX: "hidden",
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
    color: "rgb(255, 255, 255)",
  },
  previewText: {
    fontSize: 14,
    fontWeight: "300",
    color: "rgb(255, 255, 255, 50%)",
    letterSpacing: -0.17,
    overflow: "hidden", // Hide overflowing text
    whiteSpace: "nowrap", // Prevent line breaks
    textOverflow: "ellipsis", // Show ellipsis when text overflows
    maxWidth: "100%", // Ensure the text doesn't push the container beyond its bounds
  },
  boldPreviewText: {
    color: "rgb(255, 255, 255, 50%)",
    fontWeight: "600",
  },
  badgeRoot: {
    alignSelf: "center",
    marginRight: 40,
  },
  badgeInner: {
    backgroundColor: "rgb(245, 99, 101, 100%)",
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
}));
const MAX_PREVIEW_LENGTH = 30;
const ChatContent = ({ conversation }) => {
  const classes = useStyles();

  const { otherUser } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;

  const truncatedMessage =
    latestMessageText?.length > MAX_PREVIEW_LENGTH
      ? `${latestMessageText.substring(0, MAX_PREVIEW_LENGTH)}...`
      : latestMessageText;

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
          {truncatedMessage}
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
