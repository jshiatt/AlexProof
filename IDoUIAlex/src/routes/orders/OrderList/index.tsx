import React from "react";
import { OrderDetail, OrderType } from "../../../../api/src";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { Setter } from "../../../types/setter";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";

interface OrderListProps {
  orders?: OrderDetail[];
  checkedOrders: OrderDetail[];
  setCheckedOrders: Setter<OrderDetail[]>;
  setEdit: Setter<OrderDetail | undefined>;
  setEditOpen: Setter<boolean>;
}

export default function OrderList({ orders, checkedOrders, setCheckedOrders, setEdit, setEditOpen }: OrderListProps) {
  return (
    <>
      {orders && orders.length > 0 ? (
        orders.map((o, i) => (
          <Card key={i} sx={{ padding: "12px", marginBottom: i < orders.length - 1 ? "8px" : undefined }}>
            <Grid container alignItems="center">
              <Grid item md={3} xs={6}>
                <Grid container alignItems="center" wrap="nowrap">
                  <Checkbox
                    checked={!!checkedOrders.find((or) => or.id === o.id)}
                    onChange={(e, checked) =>
                      checked
                        ? setCheckedOrders((prev) => [...prev, o])
                        : setCheckedOrders((prev) => prev.filter((or) => or.id !== o.id))
                    }
                    sx={{ marginRight: "8px" }}
                  />
                  <Grid container direction="column">
                    <Typography sx={{ fontWeight: 400, color: "#878787" }}>Order Type</Typography>
                    <Typography sx={{ fontWeight: 500, color: "#212121" }}>
                      {o.orderType !== undefined ? OrderType[o.orderType].replace(/([a-z](?=[A-Z]))/g, "$1 ") : "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={3} xs={6}>
                <Grid container direction="column">
                  <Typography sx={{ fontWeight: 400, color: "#878787" }}>Customer Name</Typography>
                  <Typography sx={{ fontWeight: 500, color: "#212121" }}>{o.customerName}</Typography>
                </Grid>
              </Grid>
              <Grid item md={3} xs={6}>
                <Grid container direction="column">
                  <Typography sx={{ fontWeight: 400, color: "#878787" }}>Created By</Typography>
                  <Typography sx={{ fontWeight: 500, color: "#212121" }}>
                    {`${o.createUser} on ${moment(o.createDateTime).format("MM/DD/YY")}`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item md={3} xs={6}>
                <Grid container alignItems="center" wrap="nowrap">
                  <Grid container direction="column">
                    <Typography sx={{ fontWeight: 400, color: "#878787" }}>Updated By</Typography>
                    <Typography sx={{ fontWeight: 500, color: "#212121" }}>
                      {o.updateUser ? `${o.updateUser} on ${moment(o.updateDateTime).format("MM/DD/YY")}` : "-"}
                    </Typography>
                  </Grid>
                  <IconButton
                    sx={{ marginLeft: "auto" }}
                    onClick={() => {
                      setEdit(o);
                      setEditOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        ))
      ) : (
        <Card>
          <Grid container alignItems="center" justifyContent="center" sx={{ padding: "12px" }}>
            <Typography sx={{ fontWeight: 500, color: "#212121" }}>No Orders</Typography>
          </Grid>
        </Card>
      )}
    </>
  );
}
