import React from "react";
import { IKhoCNDH } from "../../../../../types/IKhoCNDH";
import { Card, Container, Grid } from "@mui/material";
import KDLDataTable from "./KDLDataTable";

interface IProps {
  dataTables: IKhoCNDH[];
  updateDataTable: (updatedOrders: IKhoCNDH[]) => void;
}
const KDL: React.FC<IProps> = ({ dataTables, updateDataTable }) => {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <Card>
            <KDLDataTable
              dataTables={dataTables}
              updateDataTable={updateDataTable}
              //   handleClickOpen={handleClickOpen}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default KDL;
