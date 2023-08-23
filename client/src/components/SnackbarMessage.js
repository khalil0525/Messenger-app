import React from "react";
import { Button, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles((theme) => ({
  snackbar: {
    fontWeight: "bold",
  },
  icon: {
    color: "white",
  },
  success: {
    backgroundColor: "green",
  },
  error: {
    backgroundColor: "red",
  },
}));

const SnackbarMessage = ({
  setSnackBarOpen,
  message,
  snackBarOpen,
  isError,
}) => {
  const classes = useStyles();

  const icon = isError ? (
    <Close color="secondary" />
  ) : (
    <CheckCircleOutlineIcon />
  );

  return (
    <Snackbar
      open={snackBarOpen}
      onClose={() => setSnackBarOpen(false)}
      message={message || "An error occurred. Please try again."}
      action={
        <React.Fragment>
          <Button
            className={classes.icon}
            size="small"
            onClick={() => setSnackBarOpen(false)}
          >
            {icon}
          </Button>
        </React.Fragment>
      }
      ContentProps={{
        classes: {
          root: isError ? classes.error : classes.success,
        },
      }}
    />
  );
};

export default SnackbarMessage;
