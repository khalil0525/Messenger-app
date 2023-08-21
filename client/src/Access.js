import { Box, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  bgGrid: {
    backgroundSize: "cover",
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  bgBox: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },

    minHeight: "100vh",
    alignItems: "center",
    flexDirection: "column",

    backgroundSize: "cover",
    justifyContent: "center",
    backgroundImage:
      "linear-gradient(180deg, rgb(58,141,255, 0.75) 0%, rgb(134,185,255, 0.75) 100%)",
    backgroundPosition: "center",
  },
  text: {
    color: "#ffffff",
    maxWidth: "300px",
    marginTop: "30px",
    textAlign: "center",
  },
}));

const Access = ({ WrappedComponent }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.bgGrid}>
        <Box className={classes.bgBox}>
          <img
            width="67"
            src="https://res.cloudinary.com/dna1o7hrm/image/upload/v1612406581/r1hhd9ry5wxux0tqhju0.png"
            alt="chat bubble"
          />
          <Typography variant="h4" className={classes.text}>
            Welcome to ChatApp
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={5}>
        {WrappedComponent}
      </Grid>
    </Grid>
  );
};
export default Access;
