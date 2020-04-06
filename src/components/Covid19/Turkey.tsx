import React from "react";
import Grid from "@material-ui/core/Grid";

import MostRecent from "./MostRecent";
import AllTime from "./AllTime";

export default function Turkey() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <MostRecent countryName="Turkey"></MostRecent>
      </Grid>
      <Grid item xs={6}>
        <AllTime countryName="Turkey"></AllTime>
      </Grid>
    </Grid>
  );
}
