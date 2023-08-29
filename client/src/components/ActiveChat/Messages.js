import React, { useMemo } from "react";
import { SenderBubble, OtherUserBubble } from ".";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Scrollbars } from "react-custom-scrollbars"; // Import Scrollbars

const useStyles = makeStyles(() => ({
	root: {
		height: "calc(100vh - 200px)", // Adjust the height as needed
	},
}));

const Messages = (props) => {
	const { messages, otherUser, userId, user } = props;
	const classes = useStyles();
	const getLastReadMessageId = useMemo(() => {
		for (let i = messages.length - 1; i >= 0; i--) {
			if (messages[i].isRead && messages[i].senderId === userId) {
				return messages[i].id;
			}
		}
		return 0;
	}, [messages, userId]);

	return (
		<Scrollbars
			className={classes.root}
			autoHide
			autoHideTimeout={1000}
			autoHideDuration={200}
		>
			{messages.map((message) => {
				const time = moment(message.createdAt).format("h:mm");

				return message.senderId === userId ? (
					<SenderBubble
						key={message.id}
						text={message.text}
						time={time}
						user={user}
						otherUser={otherUser}
						isLastReadMessage={getLastReadMessageId === message.id}
					/>
				) : (
					<OtherUserBubble
						key={message.id}
						text={message.text}
						time={time}
						otherUser={otherUser}
					/>
				);
			})}
		</Scrollbars>
	);
};

export default Messages;
