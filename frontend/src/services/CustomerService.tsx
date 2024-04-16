import http from "../http-common";
import { IWaterMeter } from "../types/IWaterMeter";
import { CustomerOrder } from "../types/customer_order";
const API_URL = "http://localhost:8080/api/customers";

const getAllCustomers = async () => {
  const customers = await http.get(API_URL);
  return customers;
};

interface CustomerRequest {
  customerId: string;
  customerName: string;
  customerPhoneNumber: string;
  customerAddress: string;
  readBook: string;
  waterMeter?: IWaterMeter | null;
  wtmSerial?: string | null;
}
const createCustomers = async (customer: CustomerRequest) => {
  // let WaterMeter: IWaterMeter | null = null;
  // if (customer.wtmSerial) {
  //   const waterMeterData = await WaterMeterService.getWaterMetersBySerial(
  //     customer.wtmSerial
  //   );
  //   if (waterMeterData) {
  //     WaterMeter = waterMeterData.data;
  //   }
  // }
  const customerObj: CustomerRequest = {
    customerId: customer.customerId,
    customerName: customer.customerName,
    customerPhoneNumber: customer.customerPhoneNumber,
    customerAddress: customer.customerAddress,
    readBook: customer.readBook,
    waterMeter: customer.waterMeter,
  };

  const response = await http.post(API_URL, customerObj);
  return response;
};

const getCustomerById = async (id: string) => {
  const response = await http.get<CustomerOrder>(API_URL + `/${id}`);
  return response;
};

const getCustomerByPhoneNumber = async (phoneNumber: string) => {
  const response = await http.get<CustomerOrder>(
    API_URL + `/phone/${phoneNumber}`
  );
  console.log(phoneNumber);
  console.log(response);
  return response;
};

const checkExistsUserByPhoneNumber = async (customerPhoneNumber: string) => {
  const response = await http.get<boolean>(
    API_URL + `/exists/phone/${customerPhoneNumber}`
  );
  return response;
};

const checkIActiveAccount = async (customerPhoneNumber: string) => {
  const response = await http.get<boolean>(
    API_URL + `/isActive/phone/${customerPhoneNumber}`
  );
  return response;
};
const updateCustomerActiveAccount = async (customerPhoneNumber: string) => {
  const response = await http.put(API_URL + `/phone/${customerPhoneNumber}`);
  return response;
};

const updateCustomer = async (id: string, req: CustomerRequest) => {
  const response = await http.put(API_URL + `/${id}`, req);
  return response;
};
const deleteCustomer = async (id: string | number) => {
  const response = await http.delete(API_URL + `/${id}`);
  return response;
};

const CustomerService = {
  getAllCustomers,
  createCustomers,
  getCustomerById,
  getCustomerByPhoneNumber,
  checkExistsUserByPhoneNumber,
  checkIActiveAccount,
  updateCustomerActiveAccount,
  updateCustomer,
  deleteCustomer,
};

export default CustomerService;
