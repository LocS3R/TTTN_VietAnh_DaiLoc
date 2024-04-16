import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Card {
  id: number;
  title: string;
  description: string;
}


const CardSlider: React.FC = () => {
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
      title: "Công ty cổ phần cấp nước Thanh Hóa",
      description:
        "Ngày 13/10/2016 lúc 08:09 sáng 1. Tên Công ty – Tên tiếng Việt : CÔNG TY CỔ PHẦN CẤP NƯỚC THANH HÓA – Tên tiếng Anh : THANH HOA WATER SUPPLY JOINT STOCK COMPANY – Tên viết tắt : THAWACO – Mã chứng khoán : THN 2. Trụ sở chính: Số 99, đường Mật Sơn – Phường Đông…",
      imageUrl: "http://capnuocthanhhoa.vn/wp-content/uploads/2017/11/4.png",
    },
    {
      id: 2,
      title: "Công ty cổ phần cấp nước Thanh Hóa",
      description:
        "Ngày 13/10/2016 lúc 08:09 sáng 1. Tên Công ty – Tên tiếng Việt : CÔNG TY CỔ PHẦN CẤP NƯỚC THANH HÓA – Tên tiếng Anh : THANH HOA WATER SUPPLY JOINT STOCK COMPANY – Tên viết tắt : THAWACO – Mã chứng khoán : THN 2. Trụ sở chính: Số 99, đường Mật Sơn – Phường Đông…",
      imageUrl: "http://capnuocthanhhoa.vn/wp-content/uploads/2017/11/1.png",
    },
    {
      id: 3,
      title: "Công ty cổ phần cấp nước Thanh Hóa",
      description:
        "Ngày 13/10/2016 lúc 08:09 sáng 1. Tên Công ty – Tên tiếng Việt : CÔNG TY CỔ PHẦN CẤP NƯỚC THANH HÓA – Tên tiếng Anh : THANH HOA WATER SUPPLY JOINT STOCK COMPANY – Tên viết tắt : THAWACO – Mã chứng khoán : THN 2. Trụ sở chính: Số 99, đường Mật Sơn – Phường Đông…",
      imageUrl: "http://capnuocthanhhoa.vn/wp-content/uploads/2017/11/2.png",
    },
    {
      id: 4,
      title: "Công ty cổ phần cấp nước Thanh Hóa",
      description:
        "Ngày 13/10/2016 lúc 08:09 sáng 1. Tên Công ty – Tên tiếng Việt : CÔNG TY CỔ PHẦN CẤP NƯỚC THANH HÓA – Tên tiếng Anh : THANH HOA WATER SUPPLY JOINT STOCK COMPANY – Tên viết tắt : THAWACO – Mã chứng khoán : THN 2. Trụ sở chính: Số 99, đường Mật Sơn – Phường Đông…",
      imageUrl: "http://capnuocthanhhoa.vn/wp-content/uploads/2017/11/3.png",
    },
    {
      id: 5,
      title: "Công ty cổ phần cấp nước Thanh Hóa",
      description:
        "Ngày 13/10/2016 lúc 08:09 sáng 1. Tên Công ty – Tên tiếng Việt : CÔNG TY CỔ PHẦN CẤP NƯỚC THANH HÓA – Tên tiếng Anh : THANH HOA WATER SUPPLY JOINT STOCK COMPANY – Tên viết tắt : THAWACO – Mã chứng khoán : THN 2. Trụ sở chính: Số 99, đường Mật Sơn – Phường Đông…",
      imageUrl: "http://capnuocth.vn/wp-content/uploads/2015/12/DSC_0015.jpg",
    },
    {
      id: 6,
      title: "Công ty cổ phần cấp nước Thanh Hóa",
      description:
        "Ngày 13/10/2016 lúc 08:09 sáng 1. Tên Công ty – Tên tiếng Việt : CÔNG TY CỔ PHẦN CẤP NƯỚC THANH HÓA – Tên tiếng Anh : THANH HOA WATER SUPPLY JOINT STOCK COMPANY – Tên viết tắt : THAWACO – Mã chứng khoán : THN 2. Trụ sở chính: Số 99, đường Mật Sơn – Phường Đông…",
      imageUrl: "http://capnuocthanhhoa.vn/wp-content/uploads/2017/11/4.png",
    },
    {
      id: 7,
      title: "Công ty cổ phần cấp nước Thanh Hóa",
      description:
        "Ngày 13/10/2016 lúc 08:09 sáng 1. Tên Công ty – Tên tiếng Việt : CÔNG TY CỔ PHẦN CẤP NƯỚC THANH HÓA – Tên tiếng Anh : THANH HOA WATER SUPPLY JOINT STOCK COMPANY – Tên viết tắt : THAWACO – Mã chứng khoán : THN 2. Trụ sở chính: Số 99, đường Mật Sơn – Phường Đông…",
      imageUrl: "http://capnuocthanhhoa.vn/wp-content/uploads/2017/11/1.png",
    },
    {
      id: 8,
      title: "Công ty cổ phần cấp nước Thanh Hóa",
      description:
        "Ngày 13/10/2016 lúc 08:09 sáng 1. Tên Công ty – Tên tiếng Việt : CÔNG TY CỔ PHẦN CẤP NƯỚC THANH HÓA – Tên tiếng Anh : THANH HOA WATER SUPPLY JOINT STOCK COMPANY – Tên viết tắt : THAWACO – Mã chứng khoán : THN 2. Trụ sở chính: Số 99, đường Mật Sơn – Phường Đông…",
      imageUrl: "http://capnuocthanhhoa.vn/wp-content/uploads/2017/11/2.png",
    },
    {
      id: 9,
      title: "Công ty cổ phần cấp nước Thanh Hóa",
      description:
        "Ngày 13/10/2016 lúc 08:09 sáng 1. Tên Công ty – Tên tiếng Việt : CÔNG TY CỔ PHẦN CẤP NƯỚC THANH HÓA – Tên tiếng Anh : THANH HOA WATER SUPPLY JOINT STOCK COMPANY – Tên viết tắt : THAWACO – Mã chứng khoán : THN 2. Trụ sở chính: Số 99, đường Mật Sơn – Phường Đông…",
      imageUrl: "http://capnuocthanhhoa.vn/wp-content/uploads/2017/11/3.png",
    },
    {
      id: 10,
      title: "Công ty cổ phần cấp nước Thanh Hóa",
      description:
        "Ngày 13/10/2016 lúc 08:09 sáng 1. Tên Công ty – Tên tiếng Việt : CÔNG TY CỔ PHẦN CẤP NƯỚC THANH HÓA – Tên tiếng Anh : THANH HOA WATER SUPPLY JOINT STOCK COMPANY – Tên viết tắt : THAWACO – Mã chứng khoán : THN 2. Trụ sở chính: Số 99, đường Mật Sơn – Phường Đông…",
      imageUrl: "http://capnuocth.vn/wp-content/uploads/2015/12/DSC_0015.jpg",
    },
  ];

  return (
    <Container
      id="news"
      maxWidth="xl"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h2" variant="h2" color="text.primary">
          Tin tức
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
            <Card
              sx={{ maxWidth: 600, marginLeft: "10px", maxHeight: 400 }}
              key={card.id}
            >
              <CardMedia
                sx={{ height: 150 }}
                image={card.imageUrl}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {/* Lizard */}
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  maxHeight={100}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Chia sẻ</Button>
                <Button size="small">Đọc thêm</Button>
              </CardActions>
            </Card>
          ))}
        </Carousel>
      </Box>
    </Container>
  );
};

export default CardSlider;
