import React from "react";
import { CustomerOrder } from "../../../types/customer_order";
import { Card } from "@mui/material";
import CustomerTable from "./CustomerTable";

interface IProps {
  customerOrders: CustomerOrder[];
  updateCustomerOrders: (updatedOrders: CustomerOrder[]) => void;
}
const CustomerData: React.FC<IProps> = ({
  customerOrders,
  updateCustomerOrders,
}) => {
  return (
    <Card>
      <CustomerTable
        customerOrders={customerOrders}
        updateCustomerOrders={updateCustomerOrders}
      />
    </Card>
  );
};

export default CustomerData;
