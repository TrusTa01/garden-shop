import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Асинхронный thunk для получения всех категорий
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3333/categories/all");
      if (!response.ok) {
        throw new Error("Failed to fetch categories.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Возвращаем ошибку, чтобы она была доступна в rejected состоянии
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [], // Здесь будут храниться категории
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload; // Записываем полученные категории
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch categories";
      });
  },
});

export default categoriesSlice.reducer;
