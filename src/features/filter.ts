import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  status: "all",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilterStatus(state, { payload }: PayloadAction<string>) {
      return { ...state, status: payload };
    },
    changeFilterQuery(state, { payload }: PayloadAction<string>) {
      return { ...state, query: payload };
    },
  },
});
