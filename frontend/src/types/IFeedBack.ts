import { CustomerOrder } from "./customer_order";

export interface IFeedBackResponse {
  id?: string;
  details: string;
  customerId: string;
  status: string;
}

export interface IFeedBackRequest {
  id?: string;
  details: string;
  status: string;
  customer: CustomerOrder;
}

export type feedBackStatus = "completed" | "pending";
