import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ReactCountryFlag from "react-country-flag";

export default function Top10List({
  handleChangeSelectedCountries,
  countries,
  top10Countries,
}: {
  handleChangeSelectedCountries: (selectedCountryCodes: string[]) => void;
  countries: Record<string, any>[];
  top10Countries: Record<string, any>[];
}) {
  const [selectedCountries, setSelectedCountries] = useState<
    Record<string, any>
  >({});
  const handleToggleCountry = (country: Record<string, any>) => {
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
    console.log(newSelectedCountries);
    setSelectedCountries(newSelectedCountries);
    handleChangeSelectedCountries(Object.keys(newSelectedCountries));
  };

  return (
    <List dense={true}>
      {top10Countries.map((country) => {
        return (
          <ListItem key={country.name}>
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
                  inputProps={{ "aria-labelledby": country.code }}
                />
              </ListItemSecondaryAction>
            }
          </ListItem>
        );
      })}
    </List>
  );
}
