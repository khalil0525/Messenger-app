import React from "react";
import { Box, Badge, Avatar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	profilePic: {
		height: 44,
		width: 44,
	},
	badge: {
		height: 13,
		width: 13,
		borderRadius: "50%",
		border: "2px solid rgba(8,10,25,255)",
		backgroundColor: "#D0DAE9",
	},
	online: {
		backgroundColor: "#1CED84",
	},
	sidebar: {
		marginLeft: 17,
	},
}));

const UserAvatar = ({ sidebar, username, photoUrl, online }) => {
	const classes = useStyles();

	return (
		<Box className={sidebar ? classes.sidebar : ""}>
			<Badge
				classes={{ badge: `${classes.badge} ${online && classes.online}` }}
				variant="dot"
				anchorOrigin={{ horizontal: "left", vertical: "top" }}
				overlap="circular"
			>
				<Avatar alt={username} src={photoUrl} className={classes.profilePic} />
			</Badge>
		</Box>
	);
};

export default UserAvatar;
