import { Box, Typography, Card, Avatar, Grid, Button } from "@mui/material";

// import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import imgUrl from "../../../assets/drop.png";

function Intro1() {
  const feed = [
    {
      name: "CN sản xuất nước TPTH",
      avatar: "/static/images/avatars/1.jpg",
    },
    {
      name: "Chi nhánh CN Nam TPTH",
      avatar: "/static/images/avatars/2.jpg",
    },
    {
      name: "CN cấp nước Bắc TPTH",
      avatar: "/static/images/avatars/3.jpg",
    },
    {
      name: "CN cấp nước Bỉm Sơn",
      avatar: "/static/images/avatars/4.jpg",
    },
    {
      name: "CN cấp nước Sầm Sơn",
      avatar: "/static/images/avatars/5.jpg",
    },
    {
      name: "CN cấp nước Hoằng Hóa",
      avatar: "/static/images/avatars/6.jpg",
    },
    {
      name: "CN cấp nước Quảng Xương",
      avatar: "/static/images/avatars/5.jpg",
    },
    {
      name: "CN cấp nước Tĩnh Gia",
      avatar: "/static/images/avatars/6.jpg",
    },
    {
      name: "CN cấp nước Đông Sơn",
      jobtitle: "Social Worker",
      company: "Babbleblab",
      avatar: "/static/images/avatars/5.jpg",
    },
    {
      name: "CN cấp nước Nông Cống",
      jobtitle: "Research Assistant III",
      company: "Aimbu",
      avatar: "/static/images/avatars/6.jpg",
    },
    {
      name: "CN cấp nước Triệu Sơn",
      jobtitle: "Social Worker",
      company: "Babbleblab",
      avatar: "/static/images/avatars/5.jpg",
    },
    {
      name: "CN cấp nước Ngọc Lặc",
      jobtitle: "Research Assistant III",
      company: "Aimbu",
      avatar: "/static/images/avatars/6.jpg",
    },
  ];

  return (
    <Card>
      <Box p={2}>
        <Grid container spacing={0}>
          {feed.map((_feed) => (
            <Grid key={_feed.name} item xs={12} sm={6} lg={4}>
              <Box p={3} display="flex" alignItems="flex-start">
                <Avatar src={imgUrl} />
                <Box pl={2}>
                  <Typography variant="h6" gutterBottom>
                    {_feed.name}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<KeyboardArrowRightIcon />}
                  >
                    Chi tiết
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}

export default Intro1;
