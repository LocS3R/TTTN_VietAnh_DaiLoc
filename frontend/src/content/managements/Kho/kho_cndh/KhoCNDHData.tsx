import React from "react";
import { Card } from "@mui/material";
// import KhoCotyTable from "./KhoCotyTable";
import KhoCNDHTable from "./KhoCNDHTable";
// import { IKhoCoty } from "../../../../types/IKhoCoty";
import { IKhoCNDH } from "../../../../types/IKhoCNDH";

interface IProps {
  dataTables: IKhoCNDH[];
  updateDataTable: (updatedOrders: IKhoCNDH[]) => void;
  // handleClickOpen:()=>void;
}
const KhoCNDHData: React.FC<IProps> = ({
  dataTables,
  updateDataTable,
  // handleClickOpen,
}) => {
  return (
    <Card>
      <KhoCNDHTable
        dataTables={dataTables}
        updateDataTable={updateDataTable}
        // handleClickOpen={handleClickOpen}
      />
    </Card>
  );
};

export default KhoCNDHData;
