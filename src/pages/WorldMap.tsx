import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";
import ReactTooltip from "react-tooltip";
import MapChart from "../components/MapChart";
import formatNumber from "../utils/formatNumber";
import Country from "../typings/Country";
import CovidData from "../typings/CovidData";
import GeoData from "../typings/GeoData";

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
  }
`;

export default function WorldMap() {
  let history = useHistory();
  const [covidData, setCovidData] = useState<CovidData>({
    confirmed: 0,
    deceased: 0,
  });

  const [geoData, setGeoData] = useState<GeoData>({
    NAME: "",
    POP_EST: 0,
    ISO_A2: "",
  });

  const onHover = (geoData: GeoData, covidData: CovidData) => {
    setCovidData(covidData);
    setGeoData(geoData);
  };
  const onMouseLeave = () => {
    setCovidData({
      confirmed: 0,
      deceased: 0,
    });
  };

  const handleClickEvent = (countryName: string) => {
    history.push("/country/" + countryName);
  };

  const { loading, error, data } = useQuery(WORLD_LATEST_QUERY);
  if (loading) return <LinearProgress />;
  if (error) return <p>Error :(</p>;

  const countries = data.countries.results.reduce(function (
    map: Record<string, CovidData>,
    country: Country
  ) {
    map[country.code] = country.latest;
    return map;
  },
  {});
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
        <h2>Population: {formatNumber(geoData.POP_EST)}</h2>
        <h3>Covid19 Data:</h3>
        {covidData ? (
          <ul>
            <li>Confirmed: {formatNumber(covidData.confirmed) || "unknown"}</li>
            <li>Deaths: {formatNumber(covidData.deceased) || "unknown"}</li>
          </ul>
        ) : (
          <p>No Covid19 data of this country</p>
        )}
      </ReactTooltip>
    </React.Fragment>
  );
}
