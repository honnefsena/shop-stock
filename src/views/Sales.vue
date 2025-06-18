<!-- src/views/Sales.vue -->
<template>
  <div class="container">
    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Vendas</h2>
      <button
        @click="showNewSaleModal = true"
        class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        + Nova venda
      </button>
    </div>

    <!-- Sales List -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              ID Venda
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Data
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Pagto
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Itens
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Total
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="sale in sales" :key="sale.id">
            <td class="px-6 py-4 whitespace-nowrap">#{{ sale.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ new Date(sale.sale_date).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ formatPaymentMethod(sale.payment_method) }}
            </td>
            <td class="px-6 py-4">
              <div v-for="item in sale.items" :key="item.id" class="text-sm">
                {{ item.quantity }}x {{ item.product_name }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              ${{ sale.total_amount }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                @click="viewSaleDetails(sale)"
                class="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                title="Ver detalhes"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
              <button
                @click="confirmDeleteSale(sale)"
                class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 ml-2"
                title="Deletar venda"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- New Sale Modal -->
    <NewSale
      v-if="showNewSaleModal"
      @close="showNewSaleModal = false"
      @sale-complete="onSaleComplete"
    />

    <!-- Sale Details Modal -->
    <SaleDetails
      v-if="selectedSale"
      :sale="selectedSale"
      @close="selectedSale = null"
    />

    <!-- Confirm Delete Dialog -->
    <ConfirmDialog
      :show="showDeleteConfirm"
      title="Deletar Venda"
      message="Tem certeza que deseja deletar esta venda? Esta ação não pode ser desfeita."
      confirm-text="Deletar"
      cancel-text="Cancelar"
      type="danger"
      @confirm="handleDeleteSale"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import NewSale from "@/components/sales/NewSale.vue"
import SaleDetails from "@/components/sales/SaleDetails.vue"
import ConfirmDialog from "@/components/common/ConfirmDialog.vue"

export default {
  name: "Sales",
  components: {
    NewSale,
    SaleDetails,
    ConfirmDialog,
  },
  data() {
    return {
      showNewSaleModal: false,
      selectedSale: null,
      showDeleteConfirm: false,
      saleToDelete: null,
    }
  },
  computed: {
    ...mapState("sales", {
      sales: (state) => state.items,
      loading: (state) => state.loading,
      error: (state) => state.error,
    }),
  },
  methods: {
    ...mapActions("sales", ["fetchSales", "deleteSale"]),

    viewSaleDetails(sale) {
      this.selectedSale = sale
    },

    onSaleComplete() {
      this.showNewSaleModal = false
      this.fetchSales()
    },

    confirmDeleteSale(sale) {
      this.saleToDelete = sale
      this.showDeleteConfirm = true
    },

    async handleDeleteSale() {
      try {
        await this.deleteSale(this.saleToDelete.id)
        this.showDeleteConfirm = false
        this.saleToDelete = null
      } catch (error) {
        console.error("Erro ao deletar venda:", error)
      }
    },

    cancelDelete() {
      this.showDeleteConfirm = false
      this.saleToDelete = null
    },

    formatPaymentMethod(method) {
      if (!method) return " - "

      const paymentMethods = {
        pix: "PIX",
        cartao: "Cartão",
        dinheiro: "Dinheiro",
        "pix + cartao": "PIX + Cartão",
        "pix + dinheiro": "PIX + Dinheiro",
        "cartao + dinheiro": "Cartão + Dinheiro",
      }

      return paymentMethods[method] || method
    },
  },
  mounted() {
    this.fetchSales()
  },
}
</script>
