import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
  Box,
} from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
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

  statusText: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
}));

const RecoverPassword = ({ recoverPassword }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const history = useHistory();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state for button disabling

  const handlePasswordRecovery = async (event) => {
    event.preventDefault();

    setIsButtonDisabled(true); // Disable the button while waiting for the API response

    try {
      await recoverPassword(email);
      setStatus("Password recovery instructions sent to your email.");
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } catch (error) {
      setStatus("Failed to initiate password recovery.");
    } finally {
      setIsButtonDisabled(false); // Enable the button after API response
    }
  };

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
              Recover Password
            </Typography>
            <form className={classes.form} onSubmit={handlePasswordRecovery}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal" required>
                    <TextField
                      label="Email"
                      aria-label="email"
                      type="email"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={isButtonDisabled}
                  >
                    Send Recovery Email
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Typography variant="body2" className={classes.statusText}>
            {status}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default RecoverPassword;
