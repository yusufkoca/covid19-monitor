import React from "react";
import { Switch, Route } from "react-router-dom";
import CountryDashboard from "../pages/CountryDashboard";
import WorldMap from "../pages/WorldMap";
import Covid19Dashboard from "../pages/Covid19Dashboard";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://covid19-graphql.herokuapp.com/" }),
  cache: new InMemoryCache(),
});

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <ApolloProvider client={client}>
          <Covid19Dashboard></Covid19Dashboard>
        </ApolloProvider>
      </Route>
      <Route path="/country/:countryCode">
        <ApolloProvider client={client}>
          <CountryDashboard></CountryDashboard>
        </ApolloProvider>
      </Route>
      <Route path="/world-map">
        <ApolloProvider client={client}>
          <WorldMap></WorldMap>
        </ApolloProvider>
      </Route>
    </Switch>
  );
}
