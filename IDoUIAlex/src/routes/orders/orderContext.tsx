import React from "react";
import { FindOrders } from "../../../api/src";

type Action =
  | { type: "updateFilters"; payload: FindOrders }
  | { type: "reset" }
  | { type: "updateTempFilters"; payload: FindOrders };
type Dispatch = (action: Action) => void;
type State = {
  filters: FindOrders;
  tempFilters: FindOrders;
};
type OrderProviderProps = { children: React.ReactNode };

const OrderStateContext = React.createContext<State | undefined>(undefined);
const OrderDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function orderReducer(state: State, action: Action): State {
  switch (action.type) {
    case "updateFilters": {
      return { ...state, filters: { ...state.filters, ...action.payload } };
    }
    case "reset": {
      return { ...state, filters: { page: 1, pageSize: 20 }, tempFilters: { page: 1, pageSize: 20 } };
    }
    case "updateTempFilters": {
      return { ...state, tempFilters: { ...state.tempFilters, ...action.payload } };
    }
  }
}

function OrderProvider({ children }: OrderProviderProps) {
  const [state, dispatch] = React.useReducer(orderReducer, {
    filters: { page: 1, pageSize: 20 },
    tempFilters: { page: 1, pageSize: 20 },
  });
  return (
    <OrderStateContext.Provider value={state}>
      <OrderDispatchContext.Provider value={dispatch}>{children}</OrderDispatchContext.Provider>
    </OrderStateContext.Provider>
  );
}

function useOrderState() {
  const context = React.useContext(OrderStateContext);
  if (context === undefined) {
    throw new Error("useOrderState must be used within an OrderProvider");
  }
  return context;
}

function useOrderDispatch() {
  const context = React.useContext(OrderDispatchContext);
  if (context === undefined) {
    throw new Error("useOrderDispatch must be used within an OrderProvider");
  }
  return context;
}

export { OrderProvider, useOrderState, useOrderDispatch };
