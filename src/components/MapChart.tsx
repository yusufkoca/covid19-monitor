import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import CovidData from "../typings/CovidData";
import GeoData from "../typings/GeoData";
import GeographyProps from "../typings/GeographyProps";
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({
  onHover,
  mouseLeaveEvent,
  countries,
  handleClickEvent,
}: {
  onHover: (countryGeoData: GeoData, countryCovidData: CovidData) => void;
  mouseLeaveEvent: () => void;
  countries: Record<string, CovidData>;
  handleClickEvent: (countryCode: string) => void;
}) => {
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 175 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: GeographyProps[] }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    onHover(geo.properties, countries[geo.properties.ISO_A2]);
                  }}
                  onMouseLeave={mouseLeaveEvent}
                  onClick={() => {
                    handleClickEvent(geo.properties.ISO_A2);
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
