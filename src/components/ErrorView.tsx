import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
type ErrorViewProps = {
  error: {} | null;
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
  },
}));

const ErrorView = (props: ErrorViewProps) => {
  const { error } = props;
  const classes = useStyles();
  if (error) {
    return (
      <Container className={classes.root}>
        <Typography variant="h4">Something is not right :(</Typography>
        <Typography variant="body1">{error.toString()}</Typography>
      </Container>
    );
  }
  return null;
};

export default ErrorView;
