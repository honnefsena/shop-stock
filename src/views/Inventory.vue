<template>
  <div class="container">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Estoque</h2>
    </div>

    <!-- Stock Summary Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">
            Total Produtos
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {{ totalProducts }}
          </dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">
            Itens Estoque Baixo
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-orange-600">
            {{ lowStockItems }}
          </dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">
            Itens Esgotados
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-red-600">
            {{ outOfStockItems }}
          </dd>
        </div>
      </div>
    </div>

    <!-- Search and Filter -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="flex space-x-4">
        <div class="flex-1">
          <input
            v-model="search"
            type="text"
            placeholder="Procurar produtos..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <select
            v-model="stockFilter"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">Todos níveis estoque</option>
            <option value="low">Estoque baixo</option>
            <option value="out">Esgotados</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Inventory Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
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
              Qtde Estoque
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Ações
            </th>
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in filteredInventory" :key="item.id">
            <td class="px-6 py-4">{{ item.name }}</td>
            <td class="px-6 py-4">{{ item.quantity }}</td>
            <td class="px-6 py-4">
              <span
                :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-center w-16',
                  getStockStatusClass(item.quantity),
                ]"
              >
                {{ getStockStatus(item.quantity) }}
              </span>
            </td>
            <td class="px-6 py-4">
              <button
                @click="updateStock(item)"
                class="text-indigo-600 hover:text-indigo-900 p-2 rounded-md hover:bg-indigo-50"
                title="Atualizar estoque"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Update Stock Modal -->
    <StockUpdate
      v-if="selectedItem"
      :product="selectedItem"
      @close="selectedItem = null"
      @save="saveStock"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import StockUpdate from "@/components/inventory/StockUpdate.vue"

export default {
  name: "Inventory",
  components: {
    StockUpdate,
  },
  data() {
    return {
      search: "",
      stockFilter: "all",
      selectedItem: null,
      lowStockThreshold: 5,
    }
  },
  computed: {
    ...mapState("products", {
      products: (state) => state.items,
      loading: (state) => state.loading,
      error: (state) => state.error,
    }),

    inventory() {
      if (!this.products) return []
      return this.products.map((product) => ({
        id: product.id,
        productId: product.id,
        name: product.name,
        quantity: product.quantity,
      }))
    },

    filteredInventory() {
      return this.inventory.filter((item) => {
        const matchesSearch =
          !this.search ||
          item.name.toLowerCase().includes(this.search.toLowerCase())
        const matchesStockFilter = this.filterByStockLevel(item.quantity)
        return matchesSearch && matchesStockFilter
      })
    },

    totalProducts() {
      return this.inventory.length
    },

    lowStockItems() {
      return this.inventory.filter(
        (item) => item.quantity > 0 && item.quantity <= this.lowStockThreshold
      ).length
    },

    outOfStockItems() {
      return this.inventory.filter((item) => item.quantity === 0).length
    },
  },
  methods: {
    ...mapActions("products", ["fetchProducts"]),
    ...mapActions("inventory", ["updateStock"]),

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
      if (quantity === 0) return "Zero ❌"
      if (quantity <= this.lowStockThreshold) return "Baixo 👎"
      return "Ok 👍"
    },

    getStockStatusClass(quantity) {
      if (quantity === 0) return "bg-red-100 text-red-800"
      if (quantity <= this.lowStockThreshold)
        return "bg-orange-100 text-orange-800"
      return "bg-green-100 text-green-800"
    },

    updateStock(item) {
      this.selectedItem = {
        id: item.productId,
        name: item.name,
        currentQuantity: item.quantity,
      }
    },

    async saveStock(stockData) {
      console.log("Stock data received:", stockData)
      await this.$store.dispatch("inventory/updateStock", {
        productId: this.selectedItem.id,
        data: stockData,
      })
      this.selectedItem = null
      await this.fetchProducts()
    },
  },
  mounted() {
    this.fetchProducts()
  },
}
</script>
