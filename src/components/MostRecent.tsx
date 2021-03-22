import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Doughnut } from "react-chartjs-2";
import ErrorView from "./ErrorView";
import LoadingView from "./LoadingView";
const COUNTRY_DATA = gql`
  query CountryLatest($countryCode: String!) {
    country(code: $countryCode) {
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
export default function MostRecent({ countryCode }: { countryCode: string }) {
  const { loading, error, data } = useQuery(COUNTRY_DATA, {
    variables: { countryCode },
  });

  if (loading) return <LoadingView></LoadingView>;
  if (error) return <ErrorView error={error}></ErrorView>;

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
