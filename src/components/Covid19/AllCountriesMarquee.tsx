import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";
import InfiniteScroll from "../InfiniteScrolling";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// @ts-ignore
import ReactCountryFlag from "react-country-flag";

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
          recovered
          lastUpdated
        }
      }
    }
  }
`;

export default function AllCountriesMarquee() {
  const { loading, error, data } = useQuery(WORLD_LATEST_QUERY);

  if (loading) return <LinearProgress />;
  if (error) return <p>Error :(</p>;

  return (
    <div
      style={{
        height: 1000, //TODO
        overflow: "hidden",
      }}
    >
      <List dense={true}>
        <InfiniteScroll duration={200} direction={"up"}>
          {data.countries.results.map((country: Record<string, any>) => {
            return (
              <ListItem key={country.name}>
                <Link to={"/covid19/country/" + country.code}>
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
                {/*
                 <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                */}
              </ListItem>
            );
          })}
        </InfiniteScroll>
      </List>
    </div>
  );
}
