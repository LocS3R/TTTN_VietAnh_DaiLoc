// import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink as RouterLink } from "react-router-dom";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
// import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
// import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import { CustomerOrder } from "../../types/customer_order";

const Input = styled("input")({
  display: "none",
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);
interface IProps {
  user: CustomerOrder;
}

const ProfileCover: React.FC<IProps> = ({ user }) => {
  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <Button disableRipple component={RouterLink} to="/home">
            <IconButton color="primary">
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Button>
        </Tooltip>
        <Box sx={{ marginTop: "10px" }}>
          <Typography variant="h3" component="h3" gutterBottom>
            Hồ sơ của {user.customerName}
          </Typography>
        </Box>
      </Box>
      <CardCover>
        <CardMedia
          image={"http://capnuocthanhhoa.vn/wp-content/uploads/2017/11/3.png"}
        />
        <CardCoverAction>
          <Input accept="image/*" id="change-cover" multiple type="file" />
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              Đổi ảnh
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.customerName} src={""} />
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {user.customerName}
        </Typography>
        <Typography variant="subtitle2">{user.customerPhoneNumber}</Typography>

        {/* <Box
          display={{ xs: "block", md: "flex" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Button size="small" variant="contained">
              Phản hồi
            </Button>
          </Box>
        </Box> */}
      </Box>
    </>
  );
};

// ProfileCover.propTypes = {
//   // @ts-ignore
//   user: PropTypes.object.isRequired,
// };

export default ProfileCover;
