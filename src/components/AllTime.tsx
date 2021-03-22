import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Line } from "react-chartjs-2";
import TimelineItem from "../typings/TimelineItem";
import ErrorView from "./ErrorView";
import LoadingView from "./LoadingView";

const COUNTRY_DATA = gql`
  query CountryTimeline($countryCode: String!) {
    country(code: $countryCode) {
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
    }
  }
`;

export default function AllTime({ countryCode }: { countryCode: string }) {
  const { loading, error, data } = useQuery(COUNTRY_DATA, {
    variables: { countryCode },
  });

  if (loading) return <LoadingView></LoadingView>;
  if (error) return <ErrorView error={error}></ErrorView>;

  const chartData: {
    labels: string[];
    confirmed: number[];
    deceased: number[];
    recovered: number[];
  } = {
    labels: [],
    confirmed: [],
    deceased: [],
    recovered: [],
  };

  data.country.timeline.forEach((dailyData: TimelineItem) => {
    if (dailyData.confirmed > 0) {
      chartData.labels.push(dailyData.date);
      chartData.confirmed.push(dailyData.confirmed);
      chartData.deceased.push(dailyData.deceased);
      chartData.recovered.push(dailyData.recovered);
    }
  });

  const lineData = {
    labels: chartData.labels, //Dates
    datasets: [
      {
        label: "Confirmed Cases",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#FFCE56",
        borderColor: "#FFCE56",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#FFCE56",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#FFCE56",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData.confirmed,
      },
      {
        label: "Deaths",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#FF6384",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#FF6384",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData.deceased,
      },
      {
        label: "Recovered",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#36A2EB",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#36A2EB",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData.recovered,
      },
    ],
  };
  return (
    <React.Fragment>
      <h2>All Time</h2>
      <Line data={lineData} />
    </React.Fragment>
  );
}
