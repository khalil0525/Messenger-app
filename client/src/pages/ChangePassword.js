import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  contentContainer: {
    display: "flex",
    margin: "64px 32px",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  welcomeText: {
    color: theme.palette.primary.main,
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: theme.spacing(3),
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  },
  submitButton: {
    marginTop: theme.spacing(3),
  },
  statusText: {
    marginTop: theme.spacing(2),
    color: theme.palette.error.main,
  },
}));

const ChangePassword = ({ recoveryChangePassword }) => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");

  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const history = useHistory();

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setStatus("Passwords do not match. Please try again.");
      return;
    }

    try {
      await recoveryChangePassword(token, password);
      setStatus("Password changed successfully.");
      setTimeout(() => {
        history.push("/");
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      setStatus("Failed to change password.");
    }
  };

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <div className={classes.form}>
        <Typography variant="h4" className={classes.welcomeText}>
          Change Password
        </Typography>
        <form onSubmit={handlePasswordChange}>
          <FormControl margin="normal" required>
            <TextField
              label="New Password"
              aria-label="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </FormControl>
          <FormControl margin="normal" required>
            <TextField
              label="Confirm Password"
              aria-label="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
            fullWidth
          >
            Change Password
          </Button>
        </form>
        <Typography variant="body2" className={classes.statusText}>
          {status}
        </Typography>
      </div>
    </Grid>
  );
};

export default ChangePassword;
