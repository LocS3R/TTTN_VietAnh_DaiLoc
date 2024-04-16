import { ReactNode, useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
// import Logo from 'src/components/LogoSign';
// import Logo from "../../components/Logo";
import Logo from "../../../components/Logo";

import { styled } from "@mui/material/styles";
const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
  font-size: ${theme.typography.pxToRem(75)};
`
);

const TypographyH3 = styled(Typography)(
  ({ theme }) => `
  color: ${theme.colors.alpha.black[50]};
`
);

// const OutlinedInputWrapper = styled(OutlinedInput)(
//   ({ theme }) => `
//     background-color: ${theme.colors.alpha.white[100]};
// `
// );

// const ButtonNotify = styled(Button)(
//   ({ theme }) => `
//     margin-right: -${theme.spacing(1)};
// `
// );
interface ITimer {
  [key: string]: string | number;
}

function ComingSoon() {
  const calculateTimeLeft = (): ITimer => {
    const difference = +new Date(`2025`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents: ReactNode[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <Box textAlign="center" px={3}>
        <TypographyH1 variant="h1">{timeLeft[interval]}</TypographyH1>
        <TypographyH3 variant="h3">{interval}</TypographyH3>
      </Box>
    );
  });

  return (
    <>
      <Helmet>
        <title>Status - Coming Soon</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center" mt={3}>
            <Logo />
          </Box>
          <Box textAlign="center" mb={3}>
            <Container maxWidth="xs">
              <Typography variant="h1" sx={{ mt: 4, mb: 2 }}>
                Đang trong giai đoạn phát triển
              </Typography>
              <Typography
                variant="h3"
                color="text.secondary"
                fontWeight="normal"
                sx={{ mb: 4 }}
              >
                Chúng tôi đang nỗ lực triển khai những tính năng cuối cùng
              </Typography>
            </Container>
            <img
              alt="Coming Soon"
              height={200}
              src="/static/images/status/coming-soon.svg"
            />
          </Box>

          <Box display="flex" justifyContent="center">
            {timerComponents.length ? timerComponents : <>Time's up!</>}
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default ComingSoon;
