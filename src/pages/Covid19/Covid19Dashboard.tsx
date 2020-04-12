import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import ReactCountryFlag from "react-country-flag";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Top10List from "../../components/Covid19/Top10List";
import AllCountriesMarquee from "../../components/Covid19/AllCountriesMarquee";
import MultipleCountryComparisonGraph from "../../components/Covid19/MultipleCountryComparisonGraph";
import WorldIcon from "@material-ui/icons/Public";
import formatNumber from "../../utils/formatNumber";
import { useClientInfo } from "../../ClientInfoContext";

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
          deaths: deceased
          recovered
          lastUpdated
        }
      }
    }
    latest {
      confirmed
      deaths: deceased
      recovered
      lastUpdated
    }
  }
`;

export default function Covid19Dashboard() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const clientInfo = useClientInfo();
  const { loading, error, data } = useQuery(WORLD_LATEST_QUERY);
  if (loading) return <LinearProgress />;
  if (error) return <p>Error :(</p>;
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
  const clientCountryData = data.countries.results.find(
    (country: Record<string, any>) => {
      return country.code === clientInfo.country_code;
    }
  );
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={2}>
          <ListItem>
            <Link to={"/covid19/world-map"}>
              <ListItemIcon>
                <WorldIcon></WorldIcon>
              </ListItemIcon>
            </Link>
            <ListItemText
              primary={"World Total"}
              secondary={`Cases: ${formatNumber(
                data.latest.confirmed
              )} Deaths: ${formatNumber(data.latest.deaths)}`}
            />
          </ListItem>
          <h2>Highest Numbers</h2>
          <Top10List
            handleChangeSelectedCountries={handleChangeSelectedCountries}
            countries={countriesSorted}
            top10Countries={top10Countries}
            defaultSelectedCountries={defaultSelectedCountriesMap}
          ></Top10List>
        </Grid>
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
        <Grid item xs={2}>
          {clientCountryData && (
            <ListItem>
              <Link to={"/covid19/country/" + clientCountryData.code}>
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
                )} Deaths: ${formatNumber(clientCountryData.latest.deaths)}`}
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
