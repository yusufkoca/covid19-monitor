import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import WorldMap from "../components/Covid19/WorldMap";
const client = new ApolloClient({
  uri: "https://covid19-graphql.now.sh/",
});

export default function Covid19Page() {
  return (
    <ApolloProvider client={client}>
      <WorldMap></WorldMap>
    </ApolloProvider>
  );
}
