import Container from "@mui/material/Container";
import PricingSlider from "./PricingSlider";

export default function Pricing() {
  return (
    <Container
      id="pricing"
      maxWidth="xl"
      sx={{
        // height: "100vh",
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <PricingSlider />
    </Container>
  );
}
