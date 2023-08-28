import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	root: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		marginBottom: 10,
	},
	contentContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
	},
	avatar: {
		height: 40,
		width: 40,
		marginLeft: 10,
	},

	username: {
		fontSize: 11,
		color: "rgba(79, 127, 183, 100%)",
		fontWeight: "bold",
		marginBottom: 5,
	},
	date: {
		fontSize: 11,
		color: "rgba(255, 255, 255, 50%)",
		fontWeight: "bold",
		marginBottom: 5,
	},
	bubble: {
		background: "rgba(66, 104, 149, 42%)",
		borderRadius: "10px 10px 0 10px",
		padding: 6,
		paddingLeft: 10,
		display: "flex",
		flexDirection: "column",
		justifyContent: "start",
		alignItems: "start",
		minWidth: "140px",
	},
	bubbleHeader: {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
	},
	text: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#FFFFFF",
		letterSpacing: -0.2,
	},

	readAvatar: {
		height: 20,
		width: 20,
		marginTop: 9,
	},
}));

const SenderBubble = ({ time, text, otherUser, isLastReadMessage, user }) => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<Box className={classes.contentContainer}>
				<Box className={classes.bubble}>
					<Box className={classes.bubbleHeader}>
						{" "}
						<Typography className={classes.username}>
							{user.username}
						</Typography>
						<Typography className={classes.date}>{time}</Typography>
					</Box>

					<Typography className={classes.text}>{text}</Typography>
				</Box>
				{isLastReadMessage && (
					<Avatar
						alt={otherUser.username}
						src={otherUser.photoUrl}
						className={classes.readAvatar}
					/>
				)}
			</Box>
			<Avatar
				alt={otherUser.username}
				src={user.photoUrl}
				className={classes.avatar}
			/>
		</Box>
	);
};

export default SenderBubble;
