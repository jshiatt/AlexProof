import React from "react";
import Grid from "@mui/material/Grid";
import { OrdersApi } from "../../../api/src";
import { call } from "../../../api/callWrapper";
import { useQuery } from "react-query";
import { PageContainer } from "../../components";
import TextField from "@mui/material/TextField";
import Search from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useOrderState, useOrderDispatch } from "./orderContext";

export default function OrdersList() {
  const [search, setSearch] = React.useState("");
  const { data } = useQuery(
    ["orders"],
    async () => {
      return await call(OrdersApi).ordersSearchPost({ findOrders: {} });
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <PageContainer>
      <Grid container direction="column" sx={{ flex: "1 1 auto", padding: "20px" }}>
        <Grid container alignItems="center">
          <TextField
            variant="outlined"
            label="Search"
            placeholder="Customer or Username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ marginRight: "8px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <Search fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
