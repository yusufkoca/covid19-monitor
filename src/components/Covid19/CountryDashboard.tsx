import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import MostRecent from "./MostRecent";
import AllTime from "./AllTime";
const client = new ApolloClient({
  uri: "https://covid19-graphql.now.sh/",
});
export default function CountryDashboard() {
  let { countryName } = useParams();
  return (
    <ApolloProvider client={client}>
      <Grid container>
        <Grid item xs={6}>
          <MostRecent countryName={countryName}></MostRecent>
        </Grid>
        <Grid item xs={6}>
          <AllTime countryName={countryName}></AllTime>
        </Grid>
      </Grid>
    </ApolloProvider>
  );
}
