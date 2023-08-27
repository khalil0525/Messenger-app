import React, { useRef, useState, useEffect } from "react";
import {
	ClickAwayListener,
	Grow,
	Paper,
	Popper,
	MenuItem,
	MenuList,
	Box,
	IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Link } from "react-router-dom"; // Import Link from React Router

const useStyles = makeStyles(() => ({
	ellipsis: {
		color: "#95A7C4",
		marginRight: 24,
		opacity: 0.9,
	},
	// Add a higher z-index value
	popper: {
		zIndex: 1000,
		// Adjust this value as needed
		marginRight: "8px", // Adjust this value as needed
	},
}));

export default function UserMenu({ handleLogout }) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const anchorRef = useRef();

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === "Escape") {
			setOpen(false);
		}
	}

	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<Box
			display="flex"
			alignItems="center"
			spacing={2}
			className={classes.root}
		>
			<div>
				<IconButton
					disableRipple
					disableFocusRipple
					ref={anchorRef}
					id="composition-button"
					aria-controls={open ? "composition-menu" : undefined}
					aria-expanded={open ? "true" : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
				>
					<MoreHorizIcon classes={{ root: classes.ellipsis }} />
				</IconButton>
				<Popper
					open={open}
					anchorEl={anchorRef.current}
					role={undefined}
					placement="bottom-start"
					transition
					disablePortal
					// Add the custom class for z-index
					className={classes.popper}
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === "bottom-start" ? "left top" : "left bottom",
							}}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList
										autoFocusItem={open}
										id="composition-menu"
										aria-labelledby="composition-button"
										onKeyDown={handleListKeyDown}
									>
										<MenuItem
											component={Link}
											to="/profile"
											onClick={handleClose}
										>
											Profile
										</MenuItem>
										<MenuItem
											component={Link}
											to="/account"
											onClick={handleClose}
										>
											My account
										</MenuItem>
										<MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</Box>
	);
}
