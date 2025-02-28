// src/store/index.js
import { createStore } from "vuex"
import { productService, inventoryService, salesService } from "@/services/api"

// Products Module
const products = {
  namespaced: true,
  state: {
    items: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items
    },
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_ERROR(state, error) {
      state.error = error
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit("SET_LOADING", true)
      try {
        const { data } = await productService.getAll()
        commit("SET_ITEMS", data.data)
      } catch (error) {
        commit("SET_ERROR", error.message)
      } finally {
        commit("SET_LOADING", false)
      }
    },
    async createProduct({ commit, dispatch }, productData) {
      try {
        await productService.create(productData)
        dispatch("fetchProducts")
      } catch (error) {
        commit("SET_ERROR", error.message)
      }
    },
    async updateProduct({ commit, dispatch }, { id, ...productData }) {
      try {
        await productService.update(id, productData)
        dispatch("fetchProducts")
      } catch (error) {
        commit("SET_ERROR", error.message)
      }
    },
  },
}

// Inventory Module
const inventory = {
  namespaced: true,
  state: {
    stock: {},
    loading: false,
    error: null,
  },
  mutations: {
    SET_STOCK(state, stock) {
      state.stock = stock
    },
    UPDATE_PRODUCT_STOCK(state, { productId, quantity }) {
      // If the product exists in stock, only update its quantity
      if (state.stock[productId]) {
        state.stock[productId] = {
          ...state.stock[productId],
          quantity: quantity,
        }
      } else {
        // Initialize if it doesn't exist
        state.stock[productId] = { quantity }
      }
    },
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_ERROR(state, error) {
      state.error = error
    },
  },
  actions: {
    async updateStock({ commit, dispatch }, { productId, data }) {
      commit("SET_LOADING", true)
      try {
        const response = await inventoryService.updateStock(productId, data)

        // Update the stock with the response data
        commit("UPDATE_PRODUCT_STOCK", {
          productId,
          quantity: data.quantity,
        })

        // After updating stock, fetch products to get fresh data
        dispatch("products/fetchProducts", null, { root: true })

        return true
      } catch (error) {
        commit("SET_ERROR", error.message)
        return false
      } finally {
        commit("SET_LOADING", false)
      }
    },
  },
}

// Sales Module
const sales = {
  namespaced: true,
  state: {
    items: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items
    },
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_ERROR(state, error) {
      state.error = error
    },
  },
  actions: {
    async createSale({ commit, dispatch }, saleData) {
      try {
        console.log("Creating sale with data in Vuex:", saleData)
        // The issue is here - we need to pass the entire saleData object
        // which contains both items and payment_method
        await salesService.create(saleData)
        dispatch("fetchSales")
      } catch (error) {
        commit("SET_ERROR", error.message)
      }
    },
    async fetchSales({ commit }) {
      commit("SET_LOADING", true)
      try {
        const { data } = await salesService.getAll()
        commit("SET_ITEMS", data.data) // Add .data here
      } catch (error) {
        commit("SET_ERROR", error.message)
      } finally {
        commit("SET_LOADING", false)
      }
    },
    async fetchSaleReport({ commit }, { startDate, endDate }) {
      commit("SET_LOADING", true)
      try {
        const { data } = await salesService.getSaleReport({
          startDate,
          endDate,
        })
        return data
      } catch (error) {
        commit("SET_ERROR", error.message)
        throw error
      } finally {
        commit("SET_LOADING", false)
      }
    },
  },
}

export default createStore({
  modules: {
    products,
    inventory,
    sales,
  },
})
