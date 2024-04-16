import http from "../http-common";
import { IWaterMeter } from "../types/IWaterMeter";
const API_URL = "http://localhost:8080/api/watermeters";
const getAllWaterMeters = async () => {
  const waterMeters = await http.get(API_URL);
  return waterMeters;
};

const getWaterMetersBySerial = async (serial: string) => {
  const waterMeters = await http.get(API_URL + `/serial/${serial}`);
  return waterMeters;
};

const getAllSerials = async () => {
  const serials = await http.get<string[]>(API_URL + `/serials`);
  return serials;
};

const getWaterMeterById = async (id: string) => {
  const waterMeter = await http.get(API_URL + `/${id}`);
  return waterMeter;
};

const getAllSerialsUnused = async () => {
  const serialsUnused = await http.get<string[]>(API_URL + "/serials/unused");
  return serialsUnused;
};

const updateWaterMeters = async (id: string, req: IWaterMeter) => {
  return http.put<IWaterMeter>(API_URL + `/${id}`, req);
};

const deleteWaterMeter = (id: string) => {
  return http.delete(API_URL + `/${id}`);
};

const WaterMeterService = {
  getAllWaterMeters,
  getWaterMetersBySerial,
  getAllSerials,
  getAllSerialsUnused,
  getWaterMeterById,
  updateWaterMeters,
  deleteWaterMeter,
};

export default WaterMeterService;
