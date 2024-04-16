import { Container, Grid, Tab, Tabs, styled } from "@mui/material";
import { Helmet } from "react-helmet-async";
import KhoCNDHData from "./KhoCNDHData";
// import { IKhoCoty } from "../../../../types/IKhoCoty";
import KhoCNDHService from "../../../../services/KhoCNDHService";
import { ChangeEvent, useEffect, useState } from "react";
import { IKhoCNDH } from "../../../../types/IKhoCNDH";
import MDKD from "./tabs/MDKD";
import KDL from "./tabs/KDL";
// const [currentTab, setCurrentTab] = useState<string>("mckd");
const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);
const KhoCNDH = () => {
  //   const [dataTable, setDataTable] = useState<IKhoCNDH[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("mckd");
  const [dataTableCKD, setDataTableCKD] = useState<IKhoCNDH[]>([]);
  const [dataTableDKD, setDataTableDKD] = useState<IKhoCNDH[]>([]);
  const [dataTableKDL, setDataTableKDL] = useState<IKhoCNDH[]>([]);
  const tabs = [
    { value: "mckd", label: "Mới chưa kiểm định" },
    { value: "mdkd", label: "Mới đã kiểm định" },
    { value: "kdl", label: "Kiểm định lại" },
    // { value: 'security', label: 'Passwords/Security' }
  ];
  const handleTabsChange = (
    event: ChangeEvent<object>,
    value: string
  ): void => {
    console.log(event);
    setCurrentTab(value);
  };
  const updateDataTable = (updatedOrders: IKhoCNDH[]) => {
    console.log("updated");
    // setDataTable(updatedOrders);
    getAllKhoCotyData();
    setDataTableCKD(updatedOrders);
    setDataTableDKD(updatedOrders);
    setDataTableKDL(updatedOrders);
  };

  const getAllKhoCotyData = async () => {
    const response = await KhoCNDHService.getAllDataFromKhoCNDH();
    if (response.data) {
      setDataTableCKD(
        response.data.filter(
          (data: IKhoCNDH) =>
            data.status === "CNDH_MCKD" &&
            !["D", "KDL", "KD"].includes(data.result!)
        )
      );
      setDataTableDKD(
        response.data.filter((data: IKhoCNDH) =>
          data.status.includes("CNDH_MDKD")
        )
      );
      setDataTableKDL(
        response.data.filter((data: IKhoCNDH) => data.result === "KDL")
      );
    }
  };
  useEffect(() => {
    getAllKhoCotyData();
  }, [currentTab]);
  return (
    <>
      <Helmet>
        <title>Kho chi nhánh đồng hồ</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === "mckd" && (
              <KhoCNDHData
                dataTables={dataTableCKD}
                updateDataTable={updateDataTable}
                //   handleClickOpen={handleClickOpen}
              />
            )}
            {currentTab === "mdkd" && (
              <MDKD
                dataTables={dataTableDKD}
                updateDataTable={updateDataTable}
              />
            )}
            {currentTab === "kdl" && (
              <KDL
                dataTables={dataTableKDL}
                updateDataTable={updateDataTable}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default KhoCNDH;
