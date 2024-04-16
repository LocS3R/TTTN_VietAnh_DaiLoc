import React from "react";
import { Card } from "@mui/material";
import KhoCotyTable from "./KhoCotyTable";
import { IKhoCoty } from "../../../../types/IKhoCoty";

interface IProps {
  dataTables: IKhoCoty[];
  updateDataTable: (updatedOrders: IKhoCoty[]) => void;
  handleClickOpen:()=>void;
}
const KhoCotyData: React.FC<IProps> = ({ dataTables, updateDataTable,handleClickOpen }) => {
  return (
    <Card>
      <KhoCotyTable dataTables={dataTables} updateDataTable={updateDataTable} handleClickOpen={handleClickOpen} />
    </Card>
  );
};

export default KhoCotyData;
