import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import bdivUrl from "../../../assets/Logo-BIDV-1-1924658395.png";

interface Card {
  id: number;
  title: string;
  description: string;
}

const PricingSlider: React.FC = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // const cards = [
  //   { id: 1, title: "Card 1", description: "Description for Card 1" },
  //   { id: 2, title: "Card 2", description: "Description for Card 2" },
  //   { id: 3, title: "Card 3", description: "Description for Card 3" },
  //   { id: 4, title: "Card 3", description: "Description for Card 3" },
  //   { id: 5, title: "Card 3", description: "Description for Card 3" },
  //   { id: 6, title: "Card 3", description: "Description for Card 3" },
  //   { id: 7, title: "Card 3", description: "Description for Card 3" },
  //   // Add more cards as needed
  // ];
  const cards = [
    {
      id: 1,
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbrademar.com%2Fwp-content%2Fuploads%2F2022%2F09%2FVietcombank-Logo-PNG-3.png&f=1&nofb=1&ipt=b118780a56c99ecf6cdbaa808dfd724ec3ed43b4924a7f47bd380a9fa04950af&ipo=images",
    },
    {
      id: 2,
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.tgdd.vn%2F2020%2F03%2FGameApp%2Fimage(14)-200x200-1.png&f=1&nofb=1&ipt=fc1cac71266065120134886c5d3cfc156e9386f7a66e01c0dc288a18cf00b792&ipo=images",
    },
    {
      id: 3,
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fplay-lh.googleusercontent.com%2FuaIS1Ph1K1B-M_4aX8KmHV7_31Hc22rNO9DtrsThlr3UONT7I94D1_kmGcop8hdOfP0H%3Ds180&f=1&nofb=1&ipt=d408b6d32216405eafd0cfcdee3afdfd868550411a0c4f27cc42124be1872707&ipo=images",
    },
    {
      id: 4,
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ftrangsucbac.vn%2Fwp-content%2Fuploads%2F2016%2F11%2Flogo-agribank.png&f=1&nofb=1&ipt=0d97be3d56077dd4556058fba8515e01caf3f5e9357a1b6bfd3b859ca251d87e&ipo=images",
    },
    {
      id: 5,
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvaytienonline.vn%2Fwp-content%2Fuploads%2F2022%2F04%2Fvi-dien-tu-Payoo.png&f=1&nofb=1&ipt=815a999c5981e2134db0e07254a5e5f3def431afe0d915b0e252fcd11620a2f3&ipo=images",
    },
    {
      id: 6,
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthicao.com%2Fwp-content%2Fuploads%2Felementor%2Fthumbs%2Flogo-lienviet-postbank-png-obwqulx9vhzdxkt1aohtpdjncmcas7iwkelkmfndmy.png&f=1&nofb=1&ipt=b1c4be576ae748ad093b05ff1f964e58bea5b87477afdd5d1bbfb3b9ebce5d29&ipo=images",
    },
    {
      id: 7,
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbrandlogos.net%2Fwp-content%2Fuploads%2F2021%2F09%2Fvietinbank-logo-200x200.png&f=1&nofb=1&ipt=36e2b803d169699abc2dca83aeb22499fdbdc24cd3888e99c12b63f982ef8636&ipo=images",
    },
    {
      id: 8,
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbrandlogos.net%2Fwp-content%2Fuploads%2F2020%2F11%2Fsacombank-logo-512x512.png&f=1&nofb=1&ipt=03695a94038d1df44ec0da9da2ad28a53f6d138e4bf43092b42eb56b379d8974&ipo=images",
    },
    {
      id: 9,
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.mservice.io%2Fimg%2Flogo-momo.png&f=1&nofb=1&ipt=7b0b8ec79c63787962c27e06e7ed7ed42aff1106046fb68fa304ee0d74b18f1c&ipo=images",
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h2" variant="h2" color="text.primary">
          Ngân hàng liên kết
        </Typography>
      </Box>
      <Box
        sx={{
          width: { sm: "100%", md: "120%" },
          // textAlign: { sm: "left", md: "center" },
        }}
      >
        <Carousel
          responsive={responsive}
          centerMode={true}
          infinite={true}
          autoPlay={true}
        >
          {cards.map((card) => (
            <Card sx={{ maxWidth: 345 }} key={card.id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={card.imageUrl}
                  alt="green iguana"
                  //   sx={{ objectFit: "cover" }}
                />
              </CardActionArea>
            </Card>
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default PricingSlider;
