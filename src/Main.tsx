import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CountryDashboard from "./pages/Covid19/CountryDashboard";
import WorldMap from "./pages/Covid19/WorldMap";
import Covid19Dashboard from "./pages/Covid19/Covid19Dashboard";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
const client = new ApolloClient({
  link: new HttpLink({ uri: "https://covid19-graphql.herokuapp.com/" }),
  cache: new InMemoryCache(),
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
          <Redirect to="/covid19" />
        </Route>
        <Route path="/covid19/country/:countryCode">
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
