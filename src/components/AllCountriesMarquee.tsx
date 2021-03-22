import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import InfiniteScroll from "./InfiniteScrolling";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ReactCountryFlag from "react-country-flag";
import Country from "../typings/Country";
import ErrorView from "./ErrorView";
import LoadingView from "./LoadingView";

const WORLD_LATEST_QUERY = gql`
  {
    countries(count: 200, filter: { hasCases: true }) {
      count
      totalCount
      results {
        code
        name
        latest {
          confirmed
          deceased
          lastUpdated
        }
      }
    }
  }
`;

export default function AllCountriesMarquee() {
  const { loading, error, data } = useQuery(WORLD_LATEST_QUERY);

  if (loading) return <LoadingView></LoadingView>;
  if (error) return <ErrorView error={error}></ErrorView>;

  return (
    <div
      style={{
        height: 1000, //TODO
        overflow: "hidden",
      }}
    >
      <List dense={true}>
        <InfiniteScroll duration={200} direction={"up"}>
          {data.countries.results.map((country: Country) => {
            return (
              <ListItem key={country.name}>
                <Link to={"/country/" + country.code}>
                  <ListItemAvatar>
                    <ReactCountryFlag
                      countryCode={country.code}
                      svg
                      style={{
                        fontSize: "2em",
                        lineHeight: "2em",
                      }}
                    />
                  </ListItemAvatar>
                </Link>
                <ListItemText
                  primary={country.name}
                  secondary={`Cases: ${country.latest.confirmed} Deaths: ${country.latest.deceased}`}
                />
              </ListItem>
            );
          })}
        </InfiniteScroll>
      </List>
    </div>
  );
}
