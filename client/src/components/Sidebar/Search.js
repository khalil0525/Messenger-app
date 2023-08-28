import React from "react";
import { FormControl, FilledInput, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	filledInput: {
		height: 50,
		background: "rgb(18, 22, 23)",
		borderRadius: 5,
		fontSize: 13,
		fontWeight: "bold",
		color: "#99A9C4",
		letterSpacing: 0,
		display: "flex",
		justifyContent: "center",
		marginTop: 20,
		marginBottom: 20,
	},
	input: {
		"&::placeholder": {
			color: "#ADC0DE",
			opacity: 1,
		},
	},
}));

const Search = ({ handleChange }) => {
	const classes = useStyles();

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormControl fullWidth hiddenLabel>
				<FilledInput
					name="search"
					onChange={handleChange}
					classes={{ root: classes.filledInput, input: classes.input }}
					disableUnderline
					placeholder="Search"
					startAdornment={
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					}
				></FilledInput>
			</FormControl>
		</form>
	);
};

export default Search;
