import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Top10List from "../../components/Covid19/Top10List";
import AllCountriesMarquee from "../../components/Covid19/AllCountriesMarquee";
import MultipleCountryComparisonGraph from "../../components/Covid19/MultipleCountryComparisonGraph";

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
  }
`;

export default function Covid19Dashboard() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  //const [top10List, setTop10List] = useState([]);

  const { loading, error, data } = useQuery(WORLD_LATEST_QUERY);
  if (loading) return <LinearProgress />;
  if (error) return <p>Error :(</p>;
  let countriesSorted = [...data.countries.results];
  countriesSorted.sort((a, b) =>
    a.latest.confirmed > b.latest.confirmed ? -1 : 1
  );
  const top10Countries = countriesSorted.slice(0, 10);
  const top10CountryCodes = top10Countries.map((country) => country.code);
  const handleChangeSelectedCountries = (selectedCountries: string[]) => {
    setSelectedCountries(selectedCountries);
  };
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={2}>
          <h2>Highest Numbers</h2>
          <Top10List
            handleChangeSelectedCountries={handleChangeSelectedCountries}
            countries={countriesSorted}
            top10Countries={top10Countries}
          ></Top10List>
        </Grid>
        <Grid item xs={8}>
          <h2>All Time Comparison</h2>
          <MultipleCountryComparisonGraph
            countries={
              selectedCountries.length > 0
                ? selectedCountries
                : top10CountryCodes
            }
          ></MultipleCountryComparisonGraph>
        </Grid>
        <Grid item xs={2}>
          <AllCountriesMarquee></AllCountriesMarquee>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
