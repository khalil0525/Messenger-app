import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
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
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
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

const Login = ({ user, login }) => {
  const history = useHistory();
  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const password = formElements.password.value;

    await login({ username, password });
  };

  useEffect(() => {
    if (user && user.id) history.push("/home");
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
          <Grid container justifyContent="center" direction="column">
            <Typography variant="body1" className={classes.welcomeText}>
              Welcome Back!
            </Typography>

            <form onSubmit={handleLogin}>
              <Grid>
                <Grid>
                  <FormControl margin="normal" required>
                    <TextField
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <FormControl margin="normal" required>
                  <TextField
                    label="password"
                    aria-label="password"
                    type="password"
                    name="password"
                  />
                </FormControl>
                <Grid>
                  <Button type="submit" variant="contained" size="large">
                    Login
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

export default Login;
