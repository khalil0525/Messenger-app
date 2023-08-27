import React from "react";
import { Button, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Link } from "react-router-dom"; // Import the Link component

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginTop: theme.spacing(4),
		position: "relative", // Add relative positioning
	},
	profilePhoto: {
		width: 150,
		height: 150,
		borderRadius: "50%",
		objectFit: "cover",
		marginBottom: theme.spacing(2),
	},
	backButton: {
		position: "absolute",
		top: 0,
		left: 30,
		margin: theme.spacing(1),
	},
}));

const Profile = ({ user, setUser }) => {
	const classes = useStyles();

	const uploadPhoto = async (photoFile) => {
		try {
			const formData = new FormData();
			formData.append("image", photoFile);
			console.log(photoFile);
			// Make the API call to upload the photo
			const response = await axios.post("/api/user/update-photo", formData);

			// Update the user object with the new photoUrl
			setUser((prevUser) => ({
				...prevUser,
				photoUrl: response.data.photoUrl,
			}));
		} catch (error) {
			console.error(error);
			// Handle the error here if needed
		}
	};

	const handlePhotoChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			uploadPhoto(file);
		}
	};

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
			<img src={user.photoUrl} alt="Profile" className={classes.profilePhoto} />
			<Typography variant="h5" gutterBottom>
				{user.username}
			</Typography>
			<Typography variant="body1" gutterBottom>
				{user.email}
			</Typography>
			<input
				type="file"
				accept="image/*"
				id="profile-photo-input"
				name="image"
				style={{ display: "none" }}
				onChange={handlePhotoChange}
			/>
			<label htmlFor="profile-photo-input">
				<Button component="span" variant="contained" color="primary">
					Upload Profile Photo
				</Button>
			</label>
		</div>
	);
};

export default Profile;
