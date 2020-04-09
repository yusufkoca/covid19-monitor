import React from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import MostRecent from "../../components/Covid19/MostRecent";
import AllTime from "../../components/Covid19/AllTime";
export default function CountryDashboard() {
  let { countryName } = useParams();
  return (
    <Grid container>
      <Grid item xs={6}>
        <MostRecent countryName={countryName}></MostRecent>
      </Grid>
      <Grid item xs={6}>
        <AllTime countryName={countryName}></AllTime>
      </Grid>
    </Grid>
  );
}
