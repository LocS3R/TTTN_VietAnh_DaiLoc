import React from "react";
import { CustomerOrder } from "../../../../types/customer_order";
import DialogEditCustomer from "./DialogEditCustomer";

interface IProps {
  openE: boolean;
  setOpenE: React.Dispatch<React.SetStateAction<boolean>>;
  customerOrderInfo: CustomerOrder;
  updateCustomerOrders: (updatedOrders: CustomerOrder[]) => void;
}
const WrapperDialog: React.FC<IProps> = ({
  openE,
  setOpenE,
  customerOrderInfo,
  updateCustomerOrders,
}) => {
  //   console.log(customerOrderInfo);
  return (
    <>
      {customerOrderInfo ? (
        <DialogEditCustomer
          openE={openE}
          setOpenE={setOpenE}
          customerOrderInfo={customerOrderInfo}
          updateCustomerOrders={updateCustomerOrders}
        />
      ) : (
        <p>He</p>
      )}
    </>
  );
};

export default WrapperDialog;
