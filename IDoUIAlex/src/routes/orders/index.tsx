import React from "react";
import Grid from "@mui/material/Grid";
import { OrderDetail, OrdersApi, OrderType } from "../../../api/src";
import { call } from "../../../api/callWrapper";
import { useQuery } from "react-query";
import { PageContainer } from "../../components";
import TextField from "@mui/material/TextField";
import Search from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Close from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useOrderState, useOrderDispatch } from "./orderContext";
import OrderList from "./OrderList";
import Button from "@mui/material/Button";

const orderTypeOptions = (Object.keys(OrderType).filter((s) => isNaN(Number(s))) as (keyof typeof OrderType)[]).map(
  (key) => ({
    label: key.replace(/([a-z](?=[A-Z]))/g, "$1 "),
    value: OrderType[key],
  }),
);

export default function OrdersList() {
  const state = useOrderState();
  const dispatch = useOrderDispatch();
  const [checkedOrders, setCheckedOrders] = React.useState<OrderDetail[]>([]);
  const { data: orders } = useQuery(
    ["orders", state.filters],
    async () => {
      return await call(OrdersApi).ordersSearchPost({ findOrders: { ...state.filters } });
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {
        setCheckedOrders([]);
      },
    },
  );

  return (
    <PageContainer>
      <Grid container direction="column" sx={{ flex: "1 1 auto", padding: "20px" }}>
        <Grid container alignItems="center" wrap="nowrap">
          <TextField
            variant="outlined"
            label="Search"
            placeholder="Customer or Username"
            value={state.tempFilters.search || ""}
            onChange={(e) => dispatch({ type: "updateTempFilters", payload: { search: e.target.value } })}
            sx={{ marginRight: "8px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => dispatch({ type: "updateFilters", payload: { search: state.tempFilters.search } })}
                  >
                    <Search fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="order-type-label">Order Type</InputLabel>
            <Select
              labelId="order-type-label"
              label="Order Type"
              value={state.filters.orderType !== undefined ? state.filters.orderType : null}
              endAdornment={
                state.filters.orderType !== undefined ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => dispatch({ type: "updateFilters", payload: { orderType: undefined } })}
                    >
                      <Close />
                    </IconButton>
                  </InputAdornment>
                ) : undefined
              }
              onChange={(e) => dispatch({ type: "updateFilters", payload: { orderType: e.target.value as OrderType } })}
              sx={{
                width: "200px",
                "& .MuiSelect-iconOutlined": { display: state.filters.orderType !== undefined ? "none" : undefined },
              }}
            >
              {orderTypeOptions.map((o, i) => (
                <MenuItem key={i} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid item sx={{ marginLeft: "auto" }}>
            <Grid container sx={{ marginLeft: "auto" }}>
              <Button variant="contained" color="primary" sx={{ marginRight: "12px" }}>
                Add Order
              </Button>
              <Button variant="outlined" color="error" disabled={checkedOrders.length === 0}>
                {`Delete Order(s) ${checkedOrders.length > 0 ? `(${checkedOrders.length})` : ""}`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          wrap="nowrap"
          sx={{ flex: "1 1 auto", overflowY: "auto", padding: "20px", backgroundColor: "#EAEAEA" }}
        >
          <OrderList
            orders={orders?.orders || undefined}
            checkedOrders={checkedOrders}
            setCheckedOrders={setCheckedOrders}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
