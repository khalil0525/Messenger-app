import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search, Chat, CurrentUser } from "./index";

const useStyles = makeStyles(() => ({
	root: {
		paddingLeft: 16,
		paddingRight: 16,
		flexGrow: 0,
		backgroundColor: "rgba(8,10,25,255)",
		overflowX: "hidden",
	},
	title: {
		fontSize: 16,
		letterSpacing: -0.29,
		fontWeight: "bold",
		marginTop: 32,
		marginBottom: 15,
		color: "rgba(255, 255, 255, 30%)",
	},
}));

const Sidebar = ({
	handleChange,
	searchTerm,
	conversations = [],
	user,
	setActiveChat,
	handleLogout,
}) => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<CurrentUser user={user} handleLogout={handleLogout} />
			<Search handleChange={handleChange} />
			<Typography className={classes.title}>PINNED</Typography>

			<Typography className={classes.title}>DIRECT MESSAGES</Typography>
			{conversations
				.filter((conversation) =>
					conversation.otherUser.username.includes(searchTerm)
				)
				.map((conversation) => {
					return (
						<Chat
							conversation={conversation}
							key={conversation.otherUser.username}
							setActiveChat={setActiveChat}
						/>
					);
				})}
			<Typography className={classes.title}>GROUP MESSAGES</Typography>
			<Typography className={classes.title}>FRIEND REQUESTS</Typography>
		</Box>
	);
};

export default Sidebar;
