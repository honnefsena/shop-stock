<!-- src/components/sales/SaleDetails.vue -->
<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white"
    >
      <div class="mt-3">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            Detalhes da venda #{{ sale.id }}
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Fechar</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Sale Information -->
        <div class="mb-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Data</p>
              <p class="text-sm font-medium">
                {{ new Date(sale.sale_date).toLocaleString() }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Método de pagamento</p>
              <p class="text-sm font-medium">
                {{ formatPaymentMethod(sale.payment_method) }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Valor total</p>
              <p class="text-sm font-medium">R$ {{ sale.total_amount }}</p>
            </div>
          </div>
        </div>

        <!-- Items Table -->
        <div class="border rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Produto
                </th>

                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Qtde
                </th>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Preço
                </th>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Desconto
                </th>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in sale.items" :key="item.id">
                <td class="px-4 py-2 text-sm">{{ item.product_name }}</td>
                <td class="px-4 py-2 text-sm">{{ item.quantity }}</td>
                <td class="px-4 py-2 text-sm">R$ {{ item.unit_price }}</td>
                <td class="px-4 py-2 text-sm">
                  {{ item.discount_percentage }}%
                </td>
                <td class="px-4 py-2 text-sm">
                  R$ {{ calculateItemTotal(item) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Summary -->
        <div class="mt-6 flex justify-between items-center">
          <div class="text-sm text-gray-500">
            Total de itens: {{ totalItems }}
          </div>
          <div class="text-lg font-medium">
            Total: R$ {{ sale.total_amount }}
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex justify-end">
          <button
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SaleDetails",
  props: {
    sale: {
      type: Object,
      required: true,
    },
  },
  computed: {
    totalItems() {
      return this.sale.items.reduce((total, item) => total + item.quantity, 0)
    },
  },
  methods: {
    calculateItemTotal(item) {
      const price = item.unit_price * item.quantity
      const discount = price * (item.discount_percentage / 100)
      return (price - discount).toFixed(2)
    },
    formatPaymentMethod(method) {
      if (!method) return "Not Specified"

      const paymentMethods = {
        pix: "PIX",
        cartao: "Cartão",
        dinheiro: "Dinheiro",
      }

      return paymentMethods[method] || method
    },
  },
}
</script>
