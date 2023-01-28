import React from "react";
import Grid from "@mui/material/Grid";
import { OrdersApi } from "../../../api/src";
import { call } from "../../../api/callWrapper";
import { useQuery } from "react-query";

export default function OrdersList() {
  const { data } = useQuery(["orders"], async () => {
    return await call(OrdersApi).ordersSearchPost({ findOrders: {} });
  });

  return (
    <Grid>
      <div>hi</div>
    </Grid>
  );
}
