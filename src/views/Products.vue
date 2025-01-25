<!-- src/views/Products.vue -->
<template>
  <div class="container">
    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Produtos</h2>
      <button
        @click="showAddModal = true"
        class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        + Novo Produto
      </button>
    </div>
    <pre>{{ products.data }}</pre>

    <!-- Products List -->
    <div class="bg-white shadow rounded-lg">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>

      <table class="min-w-full divide-y divide-gray-200" v-else>
        <thead>
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Nome
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Preço Custo
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Preço Venda
            </th>

            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="product in products" :key="product.id">
            <td class="px-6 py-4">{{ product.name }}</td>
            <td class="px-6 py-4">${{ product.cost_price }}</td>
            <td class="px-6 py-4">${{ product.sell_price }}</td>

            <td class="px-6 py-4">
              <button
                @click="editProduct(product)"
                class="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                Editar
              </button>
              <button
                @click="updateStock(product)"
                class="text-green-600 hover:text-green-900"
              >
                Estoque
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Product Modal -->
    <ProductForm
      v-if="showAddModal"
      :product="selectedProduct"
      @close="closeModal"
      @save="saveProduct"
    />

    <!-- Stock Update Modal -->
    <StockUpdate
      v-if="showStockModal"
      :product="selectedProduct"
      @close="closeStockModal"
      @save="saveStock"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import ProductForm from "@/components/products/ProductForm.vue"
import StockUpdate from "@/components/inventory/StockUpdate.vue"

export default {
  name: "Products",
  components: {
    ProductForm,
    StockUpdate,
  },
  data() {
    return {
      showAddModal: false,
      showStockModal: false,
      selectedProduct: null,
    }
  },
  computed: {
    ...mapState("products", {
      products: (state) => state.items,
      loading: (state) => state.loading,
      error: (state) => state.error,
    }),
  },
  methods: {
    ...mapActions("products", [
      "fetchProducts",
      "createProduct",
      "updateProduct",
    ]),
    ...mapActions("inventory", ["updateStock"]),

    editProduct(product) {
      this.selectedProduct = product
      this.showAddModal = true
    },

    updateStock(product) {
      this.selectedProduct = product
      this.showStockModal = true
    },

    closeModal() {
      this.showAddModal = false
      this.selectedProduct = null
    },

    closeStockModal() {
      this.showStockModal = false
      this.selectedProduct = null
    },

    async saveProduct(productData) {
      if (this.selectedProduct) {
        await this.updateProduct({
          id: this.selectedProduct.id,
          ...productData,
        })
      } else {
        await this.createProduct(productData)
      }
      this.closeModal()
      this.fetchProducts()
    },

    async saveStock(stockData) {
      await this.updateStock({
        productId: this.selectedProduct.id,
        data: stockData
      })
      //this.closeStockModal()
      //this.fetchProducts()
    },
  },
  mounted() {
    this.fetchProducts()
  },
}
</script>
