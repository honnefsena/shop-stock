// src/services/api.js
import axios from "axios"

const api = axios.create({
  baseURL: "https://setelip.com.br/shop-stock-jumap",
  headers: {
    "Content-Type": "application/json",
  },
})

// Product Service
export const productService = {
  getAll: () => api.get("/products"),
  get: (id) => api.get(`/products/${id}`),
  create: (data) => api.post("/products", data),
  update(id, data) {
    return api.put(`/products/${id}`, data)
  },
  delete: (id) => api.delete(`/products/${id}`),
}

// Inventory Service
export const inventoryService = {
  async updateStock(productId, data) {
    return api.put(`/products/${productId}/stock`, {
      quantity: data.quantity,
    })
  },
  async getStock(productId) {
    return api.get(`/products/${productId}/stock`)
  },
}

// Sales Service
export const salesService = {
  create: (data) => api.post("/sales", data),
  getAll: () => api.get("/sales"),
  getSaleReport: (params) => api.get("/sales/report", { params }),
  getPublisherReport: (params) => api.get("/sales/publisher-report", { params }),
  getById: (id) => api.get(`/sales/${id}`),
  delete: (id) => api.delete(`/sales/${id}`),
}

// Publisher Service
export const publisherService = {
  getAll: () => api.get("/publishers"),
}
