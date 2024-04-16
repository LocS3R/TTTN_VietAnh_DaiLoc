import { IFeedBack } from "../content/managements/Customer/feedback/FeedBack";
import http from "../http-common";
import { IFeedBackRequest, IFeedBackResponse } from "../types/IFeedBack";
const API_URL = "http://localhost:8080/api/feedbacks";

const createFeedBack = async (req: IFeedBackRequest) => {
  const res = await http.post(API_URL, req);
  console.log("feedback");
  console.log(req);
  console.log(res);
  return res;
};
const getAllFeedBacks = async () => {
  const res = await http.get<IFeedBackResponse[]>(API_URL);
  return res;
};
const getAllFeedBacksAsAdmin = async () => {
  const res = await http.get<IFeedBack[]>(API_URL + "/fam");
  return res;
};
const getAllFeedBack = async (id: string) => {
  const res = await http.get<IFeedBackResponse[]>(API_URL + `/cus/${id}`);
  return res;
};

const deleteFeedBack = async (id: string) => {
  const res = await http.delete(API_URL + `/${id}`);
  return res;
};

const FeedBackService = {
  createFeedBack,
  getAllFeedBacks,
  getAllFeedBacksAsAdmin,
  getAllFeedBack,
  deleteFeedBack,
};

export default FeedBackService;
