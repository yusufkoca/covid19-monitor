import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CountryDashboard from "./pages/Covid19/CountryDashboard";
import WorldMap from "./pages/Covid19/WorldMap";
import Covid19Dashboard from "./pages/Covid19/Covid19Dashboard";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
const client = new ApolloClient({
  uri: "https://covid19-graphql.herokuapp.com/",
});
const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));
export default function App() {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route exact path="/">
          <div>
            <h2>Home</h2>
          </div>
        </Route>
        <Route path="/covid19/country/:countryName">
          <ApolloProvider client={client}>
            <CountryDashboard></CountryDashboard>
          </ApolloProvider>
        </Route>
        <Route path="/covid19/world-map">
          <ApolloProvider client={client}>
            <WorldMap></WorldMap>
          </ApolloProvider>
        </Route>
        <Route path="/covid19">
          <ApolloProvider client={client}>
            <Covid19Dashboard></Covid19Dashboard>
          </ApolloProvider>
        </Route>
      </Switch>
    </main>
  );
}
