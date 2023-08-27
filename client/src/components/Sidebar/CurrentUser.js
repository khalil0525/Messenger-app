import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BadgeAvatar } from "./index";

import UserMenu from "./UserMenu";
const useStyles = makeStyles(() => ({
	root: {
		height: 44,
		marginTop: 23,
		marginLeft: 6,
		display: "flex",
		alignItems: "center",
	},
	subContainer: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexGrow: 1,
	},
	username: {
		letterSpacing: -0.23,
		fontSize: 16,
		fontWeight: "bold",
		marginLeft: 17,
	},
	ellipsis: {
		color: "#95A7C4",
		marginRight: 24,
		opacity: 0.5,
	},
}));

const CurrentUser = ({ user, handleLogout }) => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<BadgeAvatar photoUrl={user?.photoUrl} online={true} />
			<Box className={classes.subContainer}>
				<Typography className={classes.username}>{user?.username}</Typography>

				<UserMenu handleLogout={handleLogout} />
			</Box>
		</Box>
	);
};

export default CurrentUser;
