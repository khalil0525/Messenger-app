import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
  Link as MUILink,
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
  forgotPasswordLink: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    textDecoration: "none", // Remove underline
    "&:hover": {
      textDecoration: "underline", // Add underline on hover
    },
  },
}));

const Login = ({ user, login }) => {
  const history = useHistory();
  const classes = useStyles();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state for button disabling

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const password = formElements.password.value;

    setIsButtonDisabled(true); // Disable the button while waiting for the response

    try {
      await login({ username, password });
    } catch (error) {
      // Handle the error, if needed
    } finally {
      setIsButtonDisabled(false); // Enable the button after the API response
    }
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
        <Box container item className={classes.headerContainer}>
          <Box className={classes.headerInner}>
            <Box className={classes.headerContent}>
              <Typography variant="body1" className={classes.text}>
                Need to register?
              </Typography>
              <Link href="/register" to="/register">
                <Button>Register</Button>
              </Link>
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
              Welcome Back!
            </Typography>

            <form onSubmit={handleLogin} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      label="Password"
                      aria-label="password"
                      type="password"
                      name="password"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={isButtonDisabled}
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <MUILink
                    component={Link}
                    to="/password-recovery"
                    className={classes.forgotPasswordLink}
                  >
                    Forgot your password?
                  </MUILink>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default Login;
