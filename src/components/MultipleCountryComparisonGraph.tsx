import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Tab from "@material-ui/core/Tab";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Line } from "react-chartjs-2";
import LinearProgress from "@material-ui/core/LinearProgress";
import graphColors from "../utils/graphColors";
import Country from "../typings/Country";
import TimelineItem from "../typings/TimelineItem";

const useStyles = makeStyles({
  bottomNavigation: {
    backgroundColor: "transparent",
  },
});

const SPECIFIC_COUNTRIES_QUERY = gql`
  query SpecificCountries($filter: CountryFilter) {
    countries(filter: $filter) {
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
          death: deceased
          recovered
          lastUpdated
        }
      }
    }
  }
`;

enum Covid19NumbersType {
  CONFIRMED = "confirmed",
  DEATHS = "deceased",
  RECOVERED = "recovered",
}

enum GraphType {
  LINEAR = "linear",
  LOGARITHMIC = "logarithmic",
}

export default function MultipleCountryComparisonGraph({
  countries = [],
}: {
  countries: string[];
}) {
  const classes = useStyles();
  const [comparisonType, setComparisonType] = useState<Covid19NumbersType>(
    Covid19NumbersType.CONFIRMED
  );
  const [graphType, setGraphType] = React.useState<GraphType>(GraphType.LINEAR);
  const { loading, error, data } = useQuery(SPECIFIC_COUNTRIES_QUERY, {
    variables: {
      filter: {
        include: countries,
      },
    },
  });
  if (loading) return <LinearProgress color="secondary" />;
  if (error) {
    return <p>Error :(</p>;
  }
  if (data.countries.results.length === 0) {
    return <p>No result</p>;
  }
  const handleTabChange = (value: Covid19NumbersType) => {
    setComparisonType(value);
  };
  const datasets = data.countries.results.map(
    (country: Country, index: number) => {
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
        data: country.timeline.map(
          (dailyData: TimelineItem) => dailyData[comparisonType]
        ),
        //yAxisID: country.code,
      };
    }
  );
  const lineData = {
    labels: data.countries.results[0].timeline.map(
      (dailyData: TimelineItem) => dailyData.date
    ), //Dates
    datasets: datasets,
  };
  const options = {
    scales: {
      xAxes: [
        {
          display: true,
          type: "time",
        },
      ],
      yAxes: [
        {
          display: true,
          type: graphType,
          ticks: {
            min: 0, //minimum tick
            callback: function (value: number) {
              if (value === 100000000) return "100M";
              if (value === 10000000) return "10M";
              if (value === 1000000) return "1M";
              if (value === 100000) return "100K";
              if (value === 10000) return "10K";
              if (value === 1000) return "1K";
              if (value === 100) return "100";
              if (value === 10) return "10";
              if (value === 0) return "0";
              return null;
            },
          },
        },
      ],
    },
  };
  return (
    <React.Fragment>
      <Tabs
        value={comparisonType}
        onChange={(event, newValue) => handleTabChange(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Confirmed" value={Covid19NumbersType.CONFIRMED} />
        <Tab label="Deaths" value={Covid19NumbersType.DEATHS} />
        <Tab label="Recovered" value={Covid19NumbersType.RECOVERED} />
      </Tabs>
      <Line data={lineData} options={options} />
      <BottomNavigation
        value={graphType}
        onChange={(event, newValue) => {
          setGraphType(newValue);
        }}
        showLabels
        className={classes.bottomNavigation}
      >
        <BottomNavigationAction label="Linear" value={GraphType.LINEAR} />
        <BottomNavigationAction
          label="Logaritmic"
          value={GraphType.LOGARITHMIC}
        />
      </BottomNavigation>
    </React.Fragment>
  );
}
