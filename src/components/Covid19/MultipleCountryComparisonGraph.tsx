import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Line } from "react-chartjs-2";
import LinearProgress from "@material-ui/core/LinearProgress";
import getRandomColor from "../../utils/getRandomColor";
import graphColors from "../../utils/graphColors";

export default function MultipleCountryComparisonGraph({
  countries = [],
}: {
  countries: string[];
}) {
  console.log(countries);
  const SPECIFIC_COUNTRIES_QUERY = gql`
    {
      countries(filter: { include: ${JSON.stringify(countries)} }) {
        results {
          code
          name
          timeline {
            date
            confirmed
            deltaConfirmed
            deceased
            deltaDeceased
            recovered
            deltaRecovered
          }
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
  const { loading, error, data } = useQuery(SPECIFIC_COUNTRIES_QUERY);
  if (loading) return <LinearProgress color="secondary" />;
  if (error) {
    console.log(error);
    return <p>Error :(</p>;
  }
  console.log(data);
  if (data.countries.results.length === 0) {
    return <p>No result</p>;
  }
  const datasets = data.countries.results.map((country, index) => {
    const color = graphColors[index];
    return {
      label: country.name,
      fill: false,
      lineTension: 0.1,
      backgroundColor: color,
      borderColor: color,
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: color,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: country.timeline.map((dailyData) => dailyData.confirmed),
    };
  });

  const lineData = {
    labels: data.countries.results[0].timeline.map((day) => day.date), //Dates
    datasets: datasets,
  };
  return (
    <React.Fragment>
      <Line data={lineData} />
    </React.Fragment>
  );
}
