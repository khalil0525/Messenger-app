import React, { useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";

const useStyles = makeStyles(() => ({
	root: {
		display: "flex",
		flexGrow: 8,
		flexDirection: "column",
		borderLeft: "4px solid rgba(49,51,65,255)",
		backgroundColor: "rgba(8,28,26,255)",
	},
	chatContainer: {
		marginLeft: 41,
		marginRight: 41,
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
		justifyContent: "space-between",
	},
}));

const ActiveChat = ({
	user,
	conversations,
	activeConversation,
	postMessage,
	patchMessage,
}) => {
	const classes = useStyles();

	const conversation = useMemo(() => {
		return conversations
			? conversations.find(
					(conversation) =>
						conversation.otherUser.username === activeConversation
			  )
			: {};
	}, [conversations, activeConversation]);

	const isConversation = (obj) => {
		return obj !== {} && obj !== undefined;
	};

	useEffect(() => {
		const { senderId, isRead } =
			conversation?.messages[conversation.messages.length - 1] || {};
		if (
			conversation &&
			conversation.otherUser &&
			senderId === conversation.otherUser.id &&
			!isRead
		) {
			patchMessage(senderId);
		}
	}, [conversation, patchMessage]);

	return (
		<Box className={classes.root}>
			{isConversation(conversation) && conversation.otherUser && (
				<>
					<Header
						username={conversation.otherUser.username}
						online={conversation.otherUser.online || false}
					/>
					<Box className={classes.chatContainer}>
						{user && (
							<>
								<Messages
									messages={conversation.messages}
									otherUser={conversation.otherUser}
									userId={user.id}
									user={user}
								/>
								<Input
									otherUser={conversation.otherUser}
									conversationId={conversation.id || null}
									user={user}
									postMessage={postMessage}
								/>
							</>
						)}
					</Box>
				</>
			)}
		</Box>
	);
};

export default ActiveChat;
