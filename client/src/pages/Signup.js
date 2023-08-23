import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  headerContainer: {
    display: "flex",
    alignItems: "flex-start",
    paddingTop: "23px",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  headerInner: {
    padding: "8px",
    alignSelf: "center",
    alignItems: "center",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  contentContainer: {
    display: "flex",
    margin: "64px 32px",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  text: {
    color: "#b0b0b0",
    textAlign: "center",
    fontWeight: "400",
    whiteSpace: "nowrap",
    marginRight: "21px",
  },
  formBox: {
    display: "flex",
    margin: "64px 32px",
    alignItems: "center",
    flexDirection: "column",
  },
  welcomeText: {
    color: "#000000",
    fontSize: "26px",
    fontWeight: "600",
    paddingBottom: "20px",
  },
}));

const Signup = ({ user, register }) => {
  const history = useHistory();
  const classes = useStyles();
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const email = formElements.email.value;
    const password = formElements.password.value;
    const confirmPassword = formElements.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }
    await register({ username, email, password });
  };

  useEffect(() => {
    if (user && user.id && user.active) history.push("/home");
  }, [user, history]);

  useEffect(() => {
    if (user && user.id && !user.active) history.push("/");
  }, [user, history]);

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <Box>
        <Box container className={classes.headerContainer}>
          <Box className={classes.headerInner}>
            <Box className={classes.headerContent}>
              <Typography variant="body1" className={classes.text}>
                Need to log in?
              </Typography>
              <Button component={Link} to="/login">
                Login
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className={classes.contentContainer}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className={classes.formBox}
          >
            <Typography variant="h4" className={classes.welcomeText}>
              Register your account
            </Typography>
            <form onSubmit={handleRegister} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="E-mail address"
                      aria-label="e-mail address"
                      type="email"
                      name="email"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    error={!!formErrorMessage.confirmPassword}
                    fullWidth
                  >
                    <TextField
                      aria-label="password"
                      label="Password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="password"
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    error={!!formErrorMessage.confirmPassword}
                    fullWidth
                  >
                    <TextField
                      label="Confirm Password"
                      aria-label="confirm password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="confirmPassword"
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default Signup;
