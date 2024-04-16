import { Card, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { IFeedBackResponse } from "../../../../types/IFeedBack";
import FeedBackService from "../../../../services/FeedBackService";
import FeedBackTable from "./FeedBackTable";

export interface IFeedBack extends IFeedBackResponse {
  customerName: string;
  customerAddress: string;
}

const FeedBack: React.FC = () => {
  const [listFeedBack, setListFeedBack] = useState<IFeedBack[]>([]);
  const updateListFeedBackOrders = (updatedOrders: IFeedBack[]) => {
    setListFeedBack(updatedOrders);
  };
  useEffect(() => {
    const getAllFeedBack = async () => {
      const res = await FeedBackService.getAllFeedBacksAsAdmin();
      if (res.data) {
        setListFeedBack(res.data);
        // const getUser = await CustomerService.getCustomerById(res.data.)
      }
    };
    getAllFeedBack();
  }, []);
  return (
    <>
      <Helmet>
        <title>Quản lý khách hàng</title>
      </Helmet>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <FeedBackTable
                listFeedBacks={listFeedBack}
                updateListFeedBackOrders={updateListFeedBackOrders}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FeedBack;
