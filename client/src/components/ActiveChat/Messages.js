import React, { useMemo } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from ".";
import moment from "moment";

const Messages = (props) => {
	const { messages, otherUser, userId, user } = props;

	const getLastReadMessageId = useMemo(() => {
		for (let i = messages.length - 1; i >= 0; i--) {
			if (messages[i].isRead && messages[i].senderId === userId) {
				return messages[i].id;
			}
		}
		return 0;
	}, [messages, userId]);

	return (
		<Box>
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
		</Box>
	);
};

export default Messages;
