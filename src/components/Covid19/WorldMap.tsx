import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";

const WORLD_QUERY = gql`
  {
    countries {
      name
      mostRecent {
        confirmed
        deaths
        recovered
        growthRate
        date
      }
    }
  }
`;

export default function WorldMap() {
  let history = useHistory();
  const [covidData, setCovidData] = useState({
    confirmed: 0,
    deaths: 0,
    recovered: 0,
  });

  const [geoData, setGeoData] = useState({ NAME: "", POP_EST: 0 });

  const onHover = (geoData, covidData) => {
    setCovidData(covidData);
    setGeoData(geoData);
  };
  const onMouseLeave = () => {
    setCovidData({
      confirmed: 0,
      deaths: 0,
      recovered: 0,
    });
  };

  const handleClickEvent = (countryName) => {
    history.push("/covid19/" + countryName);
  };

  const { loading, error, data } = useQuery(WORLD_QUERY);

  if (loading) return <LinearProgress />;
  if (error) return <p>Error :(</p>;
  const countries = data.countries.reduce(function (map, country) {
    map[country.name] = country.mostRecent;
    return map;
  }, {});
  return (
    <React.Fragment>
      <MapChart
        onHover={onHover}
        countries={countries}
        mouseLeaveEvent={onMouseLeave}
        handleClickEvent={handleClickEvent}
      ></MapChart>
      <ReactTooltip>
        <h1>{geoData.NAME}</h1>
        <h2>Population: {geoData.POP_EST}</h2>
        <ul>
          <li>Confirmed: {covidData.confirmed}</li>
          <li>Deaths: {covidData.deaths}</li>
          <li>Recovered: {covidData.recovered}</li>
        </ul>
      </ReactTooltip>
    </React.Fragment>
  );
}
