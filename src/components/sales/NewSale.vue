<!-- src/components/sales/NewSale.vue -->
<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-[800px] shadow-lg rounded-md bg-white"
    >
      <div class="mt-3">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">Nova Venda</h3>
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

        <!-- Product Selection -->
        <div class="mt-4">
          <div class="flex space-x-4">
            <div class="flex-1">
              <SearchableSelect
                :products="products"
                v-model="currentItem.product_id"
                @change="onProductChange"
              />
            </div>

            <div class="w-32">
              <label class="block text-sm font-medium text-gray-700"
                >Qtd.</label
              >
              <input
                v-model.number="currentItem.quantity"
                type="number"
                min="1"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div class="w-32">
              <label class="block text-sm font-medium text-gray-700"
                >Desconto %</label
              >
              <input
                v-model.number="currentItem.discount_percentage"
                type="number"
                min="0"
                max="100"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div class="flex items-end">
              <button
                @click="addItem"
                :disabled="!canAddItem"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
              >
                Adicionar Item
              </button>
            </div>
          </div>
        </div>

        <!-- Items List -->
        <div class="mt-6">
          <h4 class="text-sm font-medium text-gray-700">Itens da Venda</h4>
          <div class="mt-2">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    Produto
                  </th>
                  <th
                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    Qtd.
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
                  <th class="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(item, index) in items" :key="index">
                  <td class="px-4 py-2">
                    {{ getProductName(item.product_id) }}
                  </td>

                  <td class="px-4 py-2">{{ item.quantity }}</td>
                  <td class="px-4 py-2">R${{ item.unit_price }}</td>
                  <td class="px-4 py-2">{{ item.discount_percentage }}%</td>
                  <td class="px-4 py-2">R${{ calculateItemTotal(item) }}</td>
                  <td class="px-4 py-2">
                    <button
                      @click="removeItem(index)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700"
            >Método pagto</label
          >
          <div class="mt-2 flex space-x-4">
            <div class="flex items-center">
              <input
                id="pix"
                name="payment_method"
                type="radio"
                v-model="paymentMethod"
                value="pix"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label for="pix" class="ml-2 text-sm text-gray-700">PIX</label>
            </div>
            <div class="flex items-center">
              <input
                id="cartao"
                name="payment_method"
                type="radio"
                v-model="paymentMethod"
                value="cartao"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label for="cartao" class="ml-2 text-sm text-gray-700"
                >Cartão</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="dinheiro"
                name="payment_method"
                type="radio"
                v-model="paymentMethod"
                value="dinheiro"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label for="dinheiro" class="ml-2 text-sm text-gray-700"
                >Dinheiro</label
              >
            </div>
          </div>
        </div>

        <!-- Total -->
        <div class="mt-6 flex justify-end">
          <div class="text-lg font-medium">Total: R${{ calculateTotal }}</div>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="$emit('close')"
            class="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            @click="completeSale"
            :disabled="items.length === 0"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
          >
            Concluir Venda
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import SearchableSelect from "@/components/SearchableSelect.vue"

export default {
  name: "NewSale",
  components: {
    SearchableSelect,
  },
  data() {
    return {
      currentItem: {
        product_id: "",

        quantity: 1,
        discount_percentage: 0,
        unit_price: 0,
      },
      items: [],
      paymentMethod: "cartao",
    }
  },
  computed: {
    ...mapState("products", {
      products: (state) => state.items,
      loading: (state) => state.loading,
      error: (state) => state.error,
    }),

    canAddItem() {
      return (
        this.currentItem.product_id &&
        this.currentItem.quantity > 0 &&
        this.currentItem.unit_price > 0
      )
    },

    calculateTotal() {
      const total = this.items.reduce((total, item) => {
        return total + parseFloat(this.calculateItemTotal(item))
      }, 0)
      return total.toFixed(2)
    },
  },
  methods: {
    ...mapActions("products", ["fetchProducts"]),
    ...mapActions("sales", ["createSale"]),

    onProductChange() {
      if (this.currentItem.product_id) {
        const product = this.products.find(
          (p) => p.id === this.currentItem.product_id
        )

        this.currentItem.unit_price = product.sell_price
      } else {
        this.currentItem.unit_price = 0
      }
    },

    getProductName(productId) {
      const product = this.products.find((p) => p.id === productId)
      return product ? product.name : ""
    },

    calculateItemTotal(item) {
      const price = item.unit_price * item.quantity
      const discount = price * (item.discount_percentage / 100)
      return (price - discount).toFixed(2)
    },

    addItem() {
      if (this.canAddItem) {
        this.items.push({ ...this.currentItem })
        this.currentItem = {
          product_id: "",
          quantity: 1,
          discount_percentage: 0,
          unit_price: 0,
        }
      }
    },

    removeItem(index) {
      this.items.splice(index, 1)
    },

    async completeSale() {
      try {
        await this.createSale({ items: this.items })
        this.$emit("sale-complete")
      } catch (error) {
        console.error("Error creating sale:", error)
      }
    },
  },
  mounted() {
    this.fetchProducts()
  },
}
</script>
