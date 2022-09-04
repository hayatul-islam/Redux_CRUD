import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from "./transactionAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
  totalCount: 0,
  page: 1,
  type: "",
  search: "",
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async ({ type, search, page }) => {
    const transactions = await getTransactions(type, search, page);

    return transactions;
  }
);

export const createTransaction = createAsyncThunk(
  "createTransaction/fetchTransactions",
  async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);

export const changeTransaction = createAsyncThunk(
  "changeTransaction/fetchTransactions",
  async ({ id, data }) => {
    const transaction = await editTransaction(id, data);
    return transaction;
  }
);

export const removeTransaction = createAsyncThunk(
  "removeTransaction/fetchTransactions",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

// create slice
const transactionsSlice = createSlice({
  name: "tranactions",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInactive: (state, action) => {
      state.editing = {};
    },
    pagination: (state, action) => {
      state.page = action.payload;
    },
    filterType: (state, action) => {
      state.type = action.payload;
    },
    searched: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.transactions = [];
        state.error = action.error.message;
      })

      .addCase(createTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions.unshift(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        state.error = action.error.message;
      })

      // update
      .addCase(changeTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(changeTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;

        const indexToUpdate = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        state.transactions[indexToUpdate] = action.payload;
      })
      .addCase(changeTransaction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message;
      })

      // remove transaction
      .addCase(removeTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;

        state.transactions = state.transactions.filter(
          (t) => t.id !== action.meta?.arg
        );
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default transactionsSlice.reducer;
export const { editActive, editInactive, pagination, filterType, searched } =
  transactionsSlice.actions;
