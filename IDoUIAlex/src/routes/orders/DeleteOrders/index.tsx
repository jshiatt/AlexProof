import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "react-query";
import { OrdersApi, OrderDetail } from "../../../../api/src";
import { call } from "../../../../api/callWrapper";
import { Setter } from "../../../types/setter";

interface DeleteOrderProps {
  checkedOrders: OrderDetail[];
  setCheckedOrders: Setter<OrderDetail[]>;
  open: boolean;
  setOpen: Setter<boolean>;
}

export default function DeleteOrders({ checkedOrders, setCheckedOrders, open, setOpen }: DeleteOrderProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteOrders, isLoading } = useMutation(
    async () => {
      for (let i = 0; i < checkedOrders.length; i++) {
        await call(OrdersApi).ordersIdDelete({ id: checkedOrders[i].id || "" });
      }
    },
    {
      onSuccess: () => {
        setCheckedOrders([]);
        setOpen(false);
        queryClient.invalidateQueries("orders");
      },
    },
  );

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
      <DialogTitle>Delete Orders</DialogTitle>
      <DialogContent>
        <Grid container alignItems="center" justifyContent="center">
          <Typography sx={{ textAlign: "center" }}>
            Are you sure you want to delete these orders? There is no going back we don't play that soft delete nonsense
            here.
          </Typography>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: "8px 20px" }}>
        <Button variant="text" color="primary" sx={{ marginRight: "12px" }} onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" disabled={isLoading} onClick={() => deleteOrders()}>
          Full Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
