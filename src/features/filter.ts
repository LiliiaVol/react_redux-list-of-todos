import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  status: "all",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilterStatus(filter, { payload }: PayloadAction<string>) {
      filter.status = payload;
    },
    changeFilterQuery(filter, {payload}: PayloadAction<string>) {
      filter.query = payload;
    }
  },
});
