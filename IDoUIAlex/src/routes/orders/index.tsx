import React from "react";
import Grid from "@mui/material/Grid";
import { OrdersApi } from "../../../api/src";
import { call } from "../../../api/callWrapper";
import { useQuery } from "react-query";
import { PageContainer } from "../../components";

export default function OrdersList() {
  const { data } = useQuery(["orders"], async () => {
    return await call(OrdersApi).ordersSearchPost({ findOrders: {} });
  });

  return (
    <PageContainer>
      <Grid container>hi</Grid>
    </PageContainer>
  );
}
