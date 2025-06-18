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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import NewSale from "@/components/sales/NewSale.vue"
import SaleDetails from "@/components/sales/SaleDetails.vue"

export default {
  name: "Sales",
  components: {
    NewSale,
    SaleDetails,
  },
  data() {
    return {
      showNewSaleModal: false,
      selectedSale: null,
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
    ...mapActions("sales", ["fetchSales"]),

    viewSaleDetails(sale) {
      this.selectedSale = sale
    },

    onSaleComplete() {
      this.showNewSaleModal = false
      this.fetchSales()
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
