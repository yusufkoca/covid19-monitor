import React, { useState } from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ReactCountryFlag from "react-country-flag";
import Country from "../typings/Country";

type Top10ListProps = {
  handleChangeSelectedCountries: (selectedCountryCodes: string[]) => void;
  top10Countries: Country[];
  defaultSelectedCountries: Record<string, Country>;
};

export default function Top10List({
  handleChangeSelectedCountries,
  top10Countries,
  defaultSelectedCountries,
}: Top10ListProps) {
  const [selectedCountries, setSelectedCountries] = useState<
    Record<string, Country>
  >(defaultSelectedCountries);
  const handleToggleCountry = (country: Country) => {
    const newSelectedCountries = { ...selectedCountries };
    if (selectedCountries[country.code]) {
      delete newSelectedCountries[country.code];
    } else {
      if (Object.keys(selectedCountries).length === 10) {
        window.alert("You cannot select more than 10 countries");
      } else {
        newSelectedCountries[country.code] = country;
      }
    }
    setSelectedCountries(newSelectedCountries);
    handleChangeSelectedCountries(Object.keys(newSelectedCountries));
  };

  return (
    <List dense={true}>
      {top10Countries.map((country) => {
        return (
          <ListItem key={country.name}>
            <Link to={"/country/" + country.code}>
              <ListItemAvatar>
                <ReactCountryFlag
                  countryCode={country.code}
                  svg
                  style={{
                    fontSize: "2em",
                    lineHeight: "2em",
                  }}
                />
              </ListItemAvatar>
            </Link>
            <ListItemText
              primary={country.name}
              secondary={`Cases: ${country.latest.confirmed} Deaths: ${country.latest.deceased}`}
            />
            {
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={(event) => handleToggleCountry(country)}
                  checked={selectedCountries[country.code] ? true : false}
                  inputProps={{
                    "aria-labelledby": country.code,
                  }}
                />
              </ListItemSecondaryAction>
            }
          </ListItem>
        );
      })}
    </List>
  );
}
