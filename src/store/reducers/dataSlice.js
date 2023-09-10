import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchListMany } from "../../api/data";

export const fetchData = createAsyncThunk("data/fetch", fetchListMany);

const dataAdapter = createEntityAdapter();
const initialState = dataAdapter.getInitialState({
  limit: null,
  isLoader: false,
});
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    searchData: (state, action) => {
      const filteredData = Object.values(state.entities).filter((list) => {
        return list.title.includes(action.payload);
      });
      dataAdapter.setAll(state, filteredData);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      dataAdapter.setAll(state, action.payload);
      state.isLoader = false;
    });
    builder.addCase(fetchData.rejected, (state) => {
      toast.error("Ошибка при загрузке данных");
      state.isLoader = false;
    });
  },
});

export const selectors = dataAdapter.getSelectors((state) => state.data);
export const { searchData } = dataSlice.actions;
export default dataSlice.reducer;
