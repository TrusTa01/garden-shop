import { createSlice } from "@reduxjs/toolkit";

// Логика для Local Storage

// Функция для загрузки состояния корзины из Local Storage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart === null) {
      // Возвращаем начальное состояние, если ничего нет в Local Storage
      return { items: [], totalQuantity: 0, totalAmount: 0 };
    }
    const cart = JSON.parse(serializedCart);
    // Проверяем наличие всех необходимых полей для безопасности
    return {
      items: cart.items || [],
      totalQuantity: cart.totalQuantity || 0,
      totalAmount: cart.totalAmount || 0,
    };
  } catch (error) {
    console.warn("Ошибка при загрузке корзины из Local Storage:", error);
    // Возвращаем начальное состояние в случае ошибки чтения/парсинга
    return { items: [], totalQuantity: 0, totalAmount: 0 };
  }
};

// Функция для сохранения состояния корзины в Local Storage
const saveCartToLocalStorage = (state) => {
  try {
    const serializedCart = JSON.stringify(state);
    localStorage.setItem("cart", serializedCart);
  } catch (error) {
    console.warn("Ошибка при сохранении корзины в Local Storage:", error);
  }
};

// Начальное состояние для корзины (загружаем из Local Storage)
const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateTotals: (state) => {
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) =>
          total +
          (item.product.discont_price !== null &&
          item.product.discont_price !== undefined
            ? item.product.discont_price
            : item.product.price) *
            item.quantity,
        0
      );
    },

    addItemToCart: (state, action) => {
      const newItem = action.payload; // Это будет объект продукта
      const existingItem = state.items.find(
        (item) => item.product.id === newItem.id
      );

      if (!existingItem) {
        state.items.push({ product: newItem, quantity: 1 });
      } else {
        existingItem.quantity++;
      }
      cartSlice.caseReducers.updateTotals(state); // Вызываем вспомогательный редьюсер для обновления итогов
      saveCartToLocalStorage(state); // Сохраняем в Local Storage
    },

    removeItemFromCart: (state, action) => {
      const id = action.payload; // Это будет ID продукта
      const existingItem = state.items.find((item) => item.product.id === id);

      if (existingItem) {
        state.items = state.items.filter((item) => item.product.id !== id);
      }
      cartSlice.caseReducers.updateTotals(state); // Вызываем вспомогательный редьюсер для обновления итогов
      saveCartToLocalStorage(state); // Сохраняем в Local Storage
    },

    decreaseItemQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.product.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.product.id !== id);
        } else {
          existingItem.quantity--;
        }
      }
      cartSlice.caseReducers.updateTotals(state); // Вызываем вспомогательный редьюсер для обновления итогов
      saveCartToLocalStorage(state); // Сохраняем в Local Storage
    },

    // Очистка всей корзины после заказа
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveCartToLocalStorage(state); // Сохраняем в Local Storage
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
