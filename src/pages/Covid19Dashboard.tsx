import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import ReactCountryFlag from "react-country-flag";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Top10List from "../components/Top10List";
import AllCountriesMarquee from "../components/AllCountriesMarquee";
import MultipleCountryComparisonGraph from "../components/MultipleCountryComparisonGraph";
import WorldIcon from "@material-ui/icons/Public";
import formatNumber from "../utils/formatNumber";
import { useClientInfo } from "../providers/ClientInfoContext";
import { Hidden } from "@material-ui/core";
import Country from "../typings/Country";
import LoadingView from "../components/LoadingView";
import ErrorView from "../components/ErrorView";

const WORLD_LATEST_QUERY = gql`
  query WorldLatest {
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
    latest {
      confirmed
      deceased
      lastUpdated
    }
  }
`;

export default function Covid19Dashboard() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const clientInfo = useClientInfo();
  const { loading, error, data } = useQuery(WORLD_LATEST_QUERY);

  if (loading) return <LoadingView></LoadingView>;
  if (error) return <ErrorView error={error}></ErrorView>;

  let countriesSorted = [...data.countries.results];
  countriesSorted.sort((a, b) =>
    a.latest.confirmed > b.latest.confirmed ? -1 : 1
  );
  const top10Countries = countriesSorted.slice(0, 10);
  const defaultSelectedCountries = top10Countries.slice(0, 5);
  const defaultSelectedCountriesCodes = defaultSelectedCountries.map(
    (country) => country.code
  );

  const defaultSelectedCountriesMap = defaultSelectedCountries.reduce(function (
    map,
    country
  ) {
    map[country.code] = country;
    return map;
  },
  {});

  const handleChangeSelectedCountries = (selectedCountries: string[]) => {
    setSelectedCountries(selectedCountries);
  };

  const clientCountryData = data.countries.results.find((country: Country) => {
    return country.code === clientInfo.country_code;
  });

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} md={2}>
          <ListItem>
            <Link to={"/world-map"}>
              <ListItemIcon>
                <WorldIcon></WorldIcon>
              </ListItemIcon>
            </Link>
            <ListItemText
              primary={"World Total"}
              secondary={`Cases: ${formatNumber(
                data.latest.confirmed
              )} Deaths: ${formatNumber(data.latest.deceased)}`}
            />
          </ListItem>
          <Hidden smDown>
            <h2>Highest Numbers</h2>
            <Top10List
              handleChangeSelectedCountries={handleChangeSelectedCountries}
              top10Countries={top10Countries}
              defaultSelectedCountries={defaultSelectedCountriesMap}
            ></Top10List>
          </Hidden>
        </Grid>
        <Hidden smDown>
          <Grid item xs={8}>
            <h2>Country Comparison</h2>
            <MultipleCountryComparisonGraph
              countries={
                selectedCountries.length > 0
                  ? selectedCountries
                  : defaultSelectedCountriesCodes
              }
            ></MultipleCountryComparisonGraph>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={2}>
          {clientCountryData && (
            <ListItem>
              <Link to={"/country/" + clientCountryData.code}>
                <ListItemAvatar>
                  <ReactCountryFlag
                    countryCode={clientCountryData.code}
                    svg
                    style={{
                      fontSize: "2em",
                      lineHeight: "2em",
                    }}
                  />
                </ListItemAvatar>
              </Link>
              <ListItemText
                primary={clientCountryData.name}
                secondary={`Cases: ${formatNumber(
                  clientCountryData.latest.confirmed
                )} Deaths: ${formatNumber(clientCountryData.latest.deceased)}`}
              />
            </ListItem>
          )}

          <h2>Countries Infected</h2>
          <AllCountriesMarquee></AllCountriesMarquee>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
