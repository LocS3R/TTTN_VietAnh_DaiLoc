import http from "../http-common";

const API_URL = "http://localhost:8080/api/khocoty";

const getAllKhoCoty = async () => {
  const khoCoty = await http.get(API_URL);
  return khoCoty;
};

const deleteKhoCoty = async (id: string) => {
  const res = await http.delete(API_URL + `/${id}`);
  return res;
};

const moveDataToCNDH = async (ids: string[]) => {
  await http.post(API_URL + `/movetocndh`, ids);
};
const KhoCoTyService = {
  getAllKhoCoty,
  deleteKhoCoty,
  moveDataToCNDH,
};

export default KhoCoTyService;
