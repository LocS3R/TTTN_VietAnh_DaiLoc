export interface IWaterMeter {
  id?: number | string;
  wtid: string;
  wtserial: string;
  usedAt?: Date | string | null;
  isActive?: boolean;
}
