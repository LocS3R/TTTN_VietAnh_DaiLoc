import { Card, Container, Grid } from "@mui/material";
import React from "react";
import MDKDDataTable from "./MDKDDataTable";
import { IKhoCNDH } from "../../../../../types/IKhoCNDH";

interface IProps {
  dataTables: IKhoCNDH[];
  updateDataTable: (updatedOrders: IKhoCNDH[]) => void;
}
const MDKD: React.FC<IProps> = ({ dataTables, updateDataTable }) => {
  // handleClickOpen}) => {
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
            <MDKDDataTable
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

export default MDKD;
