import { Box, Container, Card } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { styled } from "@mui/material/styles";

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Helmet>
        <title>Tokyo Free White React Typescript Admin Dashboard</title>
      </Helmet>
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="center"
          py={5}
          alignItems="center"
        ></Box>
        <Card sx={{ p: 10, mb: 10, borderRadius: 12 }}></Card>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;