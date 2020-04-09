import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Doughnut } from "react-chartjs-2";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function MostRecent({ countryName }) {
  const COUNTRY_DATA = gql`
    {
      country(code:"${countryName}") {
        name
  			latest {
            confirmed
            deceased
            recovered
            lastUpdated
          }
      }
    }
`;
  const { loading, error, data } = useQuery(COUNTRY_DATA);

  if (loading) return <LinearProgress />;
  if (error) return <p>Error :(</p>;

  const lastDayData = data.country.latest;

  const lastDayDonutData = {
    labels: ["Confirmed", "Deaths", "Recovered"],
    datasets: [
      {
        data: [
          lastDayData.confirmed,
          lastDayData.deceased,
          lastDayData.recovered,
        ],
        backgroundColor: ["#FFCE56", "#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FFCE56", "#FF6384", "#36A2EB"],
      },
    ],
  };
  return (
    <React.Fragment>
      <h2>{lastDayData.date}</h2>
      <Doughnut data={lastDayDonutData} />
    </React.Fragment>
  );
}
