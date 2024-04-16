import http from "../http-common";

const API_URL = "http://localhost:8080/api/khocndh";

const getAllDataFromKhoCNDH = async () => {
  const data = await http.get(API_URL);
  return data;
};

const updateSuccess = async (id: string) => {
  const res = await http.post(API_URL + `/success/${id}`);
  console.log(res);
  return res;
};
const updateFailed = async (id: string) => {
  const res = await http.post(API_URL + `/failed/${id}`);
  console.log(res);
  return res;
};
const updateReload = async (id: string) => {
  const res = await http.post(API_URL + `/reload/${id}`);
  console.log(res);
  return res;
};

const moveDataToCNCN = async (ids: string[], nameK: string) => {
  const res = await http.post(API_URL + `/movetocncn/${nameK}`, ids);
  //   console.log(res);
  return res;
};

const KhoCNDHService = {
  getAllDataFromKhoCNDH,
  updateSuccess,
  updateFailed,
  updateReload,
  moveDataToCNCN,
};

export default KhoCNDHService;
