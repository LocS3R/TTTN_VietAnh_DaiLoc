import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomerOrder } from "../../../types/customer_order";
import CustomerService from "../../../services/CustomerService";
import { Helmet } from "react-helmet-async";
import { Container, Grid } from "@mui/material";
import ProfileCover from "../../../components/Profile/ProfileCover";
import RecentActivity from "../../../components/Profile/RecentActivity";
import Feed from "../../../components/Profile/Feed";
// import PopularTags from "../../../components/Profile/PopularTags";

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //   const [currentID, setCurrentID] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<CustomerOrder>(
    {} as CustomerOrder
  );
  useEffect(() => {
    const getCustomerById = async () => {
      const res = await CustomerService.getCustomerByPhoneNumber(id!);
      if (res.data) {
        setCurrentUser(res.data);
        console.log(res.data);
      }
    };
    getCustomerById();
  }, [id]);
  return (
    <div>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover user={currentUser} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
          <Grid item xs={12}>
            <Feed cusId={currentUser.id} />
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <PopularTags /> */}
          </Grid>
          <Grid item xs={12} md={7}>
            {/* <MyCards /> */}
          </Grid>
          <Grid item xs={12} md={5}>
            {/* <Addresses /> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserProfile;
