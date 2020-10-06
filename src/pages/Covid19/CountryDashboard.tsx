import React from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import MostRecent from "../../components/Covid19/MostRecent";
import AllTime from "../../components/Covid19/AllTime";
export default function CountryDashboard() {
  let { countryCode } = useParams<{ countryCode: string }>();
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <MostRecent countryCode={countryCode}></MostRecent>
      </Grid>
      <Grid item xs={12} md={6}>
        <AllTime countryCode={countryCode}></AllTime>
      </Grid>
    </Grid>
  );
}
