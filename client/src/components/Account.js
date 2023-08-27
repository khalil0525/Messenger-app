import React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginTop: theme.spacing(4),
		position: "relative",
	},
	backButton: {
		position: "absolute",
		top: 0,
		left: 30,
		margin: theme.spacing(1),
	},
}));

const Account = ({ user }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Button
				component={Link}
				to="/home"
				variant="contained"
				color="default"
				className={classes.backButton}
			>
				Back to Home
			</Button>
			<Typography variant="h5" gutterBottom>
				{user.username}'s Account
			</Typography>
			<Typography variant="body1" gutterBottom>
				Email: {user.email}
			</Typography>
			<Typography variant="body1" gutterBottom>
				Account settings and details can go here.
			</Typography>
		</div>
	);
};

export default Account;
