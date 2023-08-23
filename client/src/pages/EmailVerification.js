import React, { useState } from "react";

import { Grid, Box, Typography, Button, makeStyles } from "@material-ui/core";

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
  welcomeText: {
    color: "#000000",
    fontSize: "26px",
    fontWeight: "600",
    paddingBottom: "20px",
  },
  resendButton: {
    marginTop: theme.spacing(2),
  },
}));

const EmailVerification = ({ user, resendVerification }) => {
  const classes = useStyles();

  const [verificationStatus, setVerificationStatus] = useState("");

  const handleResendVerification = async () => {
    try {
      await resendVerification(user); // Implement this function to send a new verification link
      setVerificationStatus("Verification link resent! Check your email.");
    } catch (error) {
      setVerificationStatus("Failed to resend verification link.");
    }
  };

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <Box className={classes.contentContainer}>
        <Grid container justifyContent="center" direction="column">
          <Typography variant="body1" className={classes.welcomeText}>
            You must verify your email to access the application.
          </Typography>
          <Typography variant="body2">{verificationStatus}</Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.resendButton}
            onClick={handleResendVerification}
          >
            Resend Verification Link
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
};

export default EmailVerification;
