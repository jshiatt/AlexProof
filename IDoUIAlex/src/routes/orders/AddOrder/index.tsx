import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Close from "@mui/icons-material/Close";
import { useMutation, useQueryClient } from "react-query";
import { OrdersApi, CreateOrder, OrderType, OrderDetail } from "../../../../api/src";
import { call } from "../../../../api/callWrapper";
import { Setter } from "../../../types/setter";

interface AddOrderProps {
  open: boolean;
  setOpen: Setter<boolean>;
  edit?: OrderDetail;
  setEdit: Setter<OrderDetail | undefined>;
}

const orderTypeOptions = (Object.keys(OrderType).filter((s) => isNaN(Number(s))) as (keyof typeof OrderType)[]).map(
  (key) => ({
    label: key.replace(/([a-z](?=[A-Z]))/g, "$1 "),
    value: OrderType[key],
  }),
);

export default function AddOrder({ open, setOpen, edit, setEdit }: AddOrderProps) {
  const [create, setCreate] = React.useState<CreateOrder>({});
  const queryClient = useQueryClient();

  const { mutate: addOrder, isLoading } = useMutation(
    async () => {
      return await call(OrdersApi).ordersPost({ createOrder: { ...create } });
    },
    {
      onSuccess: () => {
        setCreate({});
        setOpen(false);
        queryClient.invalidateQueries("orders");
      },
    },
  );

  const { mutate: editOrder, isLoading: editLoading } = useMutation(
    async () => {
      return await call(OrdersApi).ordersIdPut({ id: edit?.id || "", updateOrder: { ...create } });
    },
    {
      onSuccess: () => {
        setCreate({});
        setEdit(undefined);
        setOpen(false);
        queryClient.invalidateQueries("orders");
      },
    },
  );

  React.useEffect(() => {
    if (edit) {
      setCreate({ customerName: edit.customerName, orderType: edit.orderType });
    }
  }, [edit]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setCreate({});
        setEdit(undefined);
        setOpen(false);
      }}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Add Order</DialogTitle>
      <DialogContent>
        <Grid container direction="column" alignItems="center" sx={{ padding: "8px" }}>
          <TextField
            variant="outlined"
            label="Customer Name"
            placeholder="Enter"
            value={create.customerName || ""}
            onChange={(e) => setCreate((prev) => ({ ...prev, customerName: e.target.value }))}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="order-type-label" sx={{ marginTop: "16px" }}>
              Order Type
            </InputLabel>
            <Select
              labelId="order-type-label"
              label="Order Type"
              value={create.orderType !== undefined ? create.orderType : null}
              endAdornment={
                create.orderType !== undefined ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setCreate((prev) => ({ ...prev, orderType: undefined }))}>
                      <Close />
                    </IconButton>
                  </InputAdornment>
                ) : undefined
              }
              onChange={(e) => setCreate((prev) => ({ ...prev, orderType: e.target.value as OrderType }))}
              sx={{
                width: "210px",
                "& .MuiSelect-iconOutlined": { display: create.orderType !== undefined ? "none" : undefined },
                marginTop: "16px",
              }}
            >
              {orderTypeOptions.map((o, i) => (
                <MenuItem key={i} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: "8px 20px" }}>
        <Button
          variant="text"
          color="primary"
          sx={{ marginRight: "12px" }}
          onClick={() => {
            setCreate({});
            setEdit(undefined);
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!create.customerName || create.orderType === undefined || isLoading || editLoading}
          onClick={() => (edit === undefined ? addOrder() : editOrder())}
        >
          {edit === undefined ? "Add" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
