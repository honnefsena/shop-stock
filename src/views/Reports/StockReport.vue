Here's the modified code with sizes removed: ```vue
<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="mb-6">
      <h3 class="text-lg font-medium text-gray-900">Estoque</h3>
      <p class="mt-1 text-sm text-gray-500">Níveis de estoque</p>
    </div>

    <!-- Filters -->
    <div class="mb-6">
      <div class="flex space-x-4">
        <div class="flex-1">
          <input
            v-model="search"
            type="text"
            placeholder="Buscar produtos..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <select
            v-model="stockFilter"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">Todos os níveis</option>
            <option value="low">Estoque baixo</option>
            <option value="out">Esgotado</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Stock Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Produto
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Estoque atual
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in filteredStock" :key="item.product_id">
            <td class="px-6 py-4">{{ item.product_name }}</td>
            <td class="px-6 py-4">{{ item.quantity }}</td>
            <td class="px-6 py-4">
              <span
                :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  getStockStatusClass(item.quantity),
                ]"
              >
                {{ getStockStatus(item.quantity) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Summary Cards -->
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">
            Total de produtos
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {{ totalProducts }}
          </dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">
            Itens com estoque baixo
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-orange-600">
            {{ lowStockCount }}
          </dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">
            Itens esgotados
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-red-600">
            {{ outOfStockCount }}
          </dd>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  name: "StockReport",
  data() {
    return {
      search: "",
      stockFilter: "all",
      lowStockThreshold: 5,
    }
  },
  computed: {
    ...mapState("products", {
      products: (state) => state.items,
      loading: (state) => state.loading,
      error: (state) => state.error,
    }),

    stockList() {
      if (!this.products) return []
      return this.products.map((product) => ({
        product_id: product.id,
        product_name: product.name,
        quantity: product.quantity,
      }))
    },

    filteredStock() {
      return this.stockList.filter((item) => {
        const matchesSearch =
          !this.search ||
          item.product_name.toLowerCase().includes(this.search.toLowerCase())
        const matchesStockFilter = this.filterByStockLevel(item.quantity)
        return matchesSearch && matchesStockFilter
      })
    },

    totalProducts() {
      return this.stockList.length
    },

    lowStockCount() {
      return this.stockList.filter(
        (item) => item.quantity > 0 && item.quantity <= this.lowStockThreshold
      ).length
    },

    outOfStockCount() {
      return this.stockList.filter((item) => item.quantity === 0).length
    },
  },
  methods: {
    ...mapActions("products", ["fetchProducts"]),

    filterByStockLevel(quantity) {
      switch (this.stockFilter) {
        case "low":
          return quantity > 0 && quantity <= this.lowStockThreshold
        case "out":
          return quantity === 0
        default:
          return true
      }
    },

    getStockStatus(quantity) {
      if (quantity === 0) return "Esgotado"
      if (quantity <= this.lowStockThreshold) return "Estoque baixo"
      return "Em estoque"
    },

    getStockStatusClass(quantity) {
      if (quantity === 0) return "bg-red-100 text-red-800"
      if (quantity <= this.lowStockThreshold)
        return "bg-orange-100 text-orange-800"
      return "bg-green-100 text-green-800"
    },
  },
  mounted() {
    this.fetchProducts()
  },
}
</script>
