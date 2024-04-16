type resultType = "D" | "KD" | "KDL";
export interface IKhoCNDH {
  id?: string;
  wtid: string;
  status: string;
  dateToCheck: Date | string | null;
  expCheck: Date | string | null;
  groupCheck: string | null;
  result: resultType | null;
}
