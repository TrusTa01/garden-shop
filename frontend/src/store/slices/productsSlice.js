import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Асинхронный thunk для получения всех продуктов
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3333/products/all");
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Асинхронный thunk для получения продуктов по категории
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3333/categories/${categoryId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch products for category ${categoryId}.`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Асинхронный thunk для получения одного продукта по ID
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3333/products/${productId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch product ${productId}.`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [], // Список всех продуктов или продуктов по категории
    currentProduct: null, // Детали одного продукта
    status: "idle",
    error: null,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Кейсы для fetchProducts (все продукты)
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch all products";
      })
      // Кейсы для fetchProductsByCategory (продукты по категории)
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch products by category";
      })
      // Кейсы для fetchSingleProduct (один продукт)
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.currentProduct = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch single product";
        state.currentProduct = null;
      });
  },
});

export const { clearCurrentProduct } = productsSlice.actions; // Экспортируем синхронные экшены
export default productsSlice.reducer;
