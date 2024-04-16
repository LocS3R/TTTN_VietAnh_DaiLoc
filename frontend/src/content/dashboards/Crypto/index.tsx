import { Helmet } from "react-helmet-async";
// import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from "@mui/material";
import Footer from "../../../components/Footer";

import AccountBalance from "./AccountBalance";
import Wallets from "./Wallets";

function DashboardCrypto() {
  return (
    <>
      <Helmet>
        <title>Thống kê chung</title>
      </Helmet>
      <Container maxWidth="xl" sx={{ marginTop: "70px" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item xs={12}>
            <Wallets />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
