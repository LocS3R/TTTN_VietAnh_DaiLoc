// export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

import { IWaterMeter } from "./IWaterMeter";

// export interface CryptoOrder {
//   id: string;
//   status: CryptoOrderStatus;
//   orderDetails: string;
//   orderDate: number;
//   orderID: string;
//   sourceName: string;
//   sourceDesc: string;
//   amountCrypto: number;
//   amount: number;
//   cryptoCurrency: string;
//   currency: string;
// }

export type CustomerWithWaterMeterStatus = "completed" | "pending" | "failed";

export interface CustomerOrder {
  id?: number | string;
  customerId: string;
  status?: boolean;
  customerName: string;
  customerPhoneNumber: string;
  customerAddress: string;
  readBook: string;
  waterMeter?: IWaterMeter | null;
  waterMeterId?: string | null;
}
