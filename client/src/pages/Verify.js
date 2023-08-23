import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  contentContainer: {
    display: "flex",
    margin: "64px 32px",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  successText: {
    color: "#000000",
    fontSize: "26px",
    fontWeight: "600",
    paddingBottom: "20px",
  },
  errorText: {
    color: "red",
    fontSize: "18px",
    paddingBottom: "20px",
  },
}));

const VerifySuccess = ({ checkVerification }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const [verificationStatus, setVerificationStatus] = useState("");

  useEffect(() => {
    if (!location.search) {
      history.push("/");
    } else {
      const token = new URLSearchParams(location.search).get("token");
      if (!token) {
        history.push("/");
      } else {
        checkVerification(token)
          .then(() => {
            setVerificationStatus("success");
            setTimeout(() => {
              history.push("/");
            }, 5000); // Redirect after 5 seconds
          })
          .catch((error) => {
            console.error(error);
            setVerificationStatus("error");
            setTimeout(() => {
              history.push("/");
            }, 5000); // Redirect after 5 seconds
          });
      }
    }
  }, [history, location.search, checkVerification]);

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <Box className={classes.contentContainer}>
        <Grid container justifyContent="center" direction="column">
          {verificationStatus === "success" ? (
            <>
              <Typography variant="body1" className={classes.successText}>
                Thank you, your account has been verified!
              </Typography>
              <Typography variant="body2">
                You will be redirected to the home page shortly.
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body1" className={classes.errorText}>
                Email verification failed.
              </Typography>
              <Typography variant="body2">
                You will be redirected to the home page shortly.
              </Typography>
            </>
          )}
        </Grid>
      </Box>
    </Grid>
  );
};

export default VerifySuccess;
