import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	root: {
		display: "flex",
		marginBottom: 10,
	},
	avatar: {
		height: 40,
		width: 40,
		marginRight: 11,
		alignSelf: "flex-end",
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
		backgroundColor: "rgba(33, 35, 38, 60%)",
		borderRadius: "8px 10px 10px 2px",
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
}));

const OtherUserBubble = ({ text, time, otherUser }) => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<Avatar
				alt={otherUser.username}
				src={otherUser.photoUrl}
				className={classes.avatar}
			/>
			<Box>
				<Box className={classes.bubble}>
					<Box className={classes.bubbleHeader}>
						{" "}
						<Typography className={classes.username}>
							{otherUser.username}
						</Typography>
						<Typography className={classes.date}>{time}</Typography>
					</Box>

					<Typography className={classes.text}>{text}</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default OtherUserBubble;
