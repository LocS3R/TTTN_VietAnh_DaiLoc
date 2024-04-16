import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../../components/Footer";
import { Container, Grid } from "@mui/material";
import CustomerData from "./CustomerData";
import CustomerService from "../../../services/CustomerService";
import { CustomerOrder } from "../../../types/customer_order";

const ManagementCustomer: React.FC = () => {
  const [customerOrders, setCustomerOrders] = useState<CustomerOrder[]>([]);
  const updateCustomerOrders = (updatedOrders: CustomerOrder[]) => {
    setCustomerOrders(updatedOrders);
  };
  useEffect(() => {
    const getAllCustomers = async () => {
      const customers = await CustomerService.getAllCustomers();
      console.log(customers);
      if (customers) {
        if (Array.isArray(customers.data)) {
          setCustomerOrders(customers.data);
        }
      }
    };
    getAllCustomers();
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
            <CustomerData
              customerOrders={customerOrders}
              updateCustomerOrders={updateCustomerOrders}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ManagementCustomer;
