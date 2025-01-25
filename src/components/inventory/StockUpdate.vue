<!-- src/components/inventory/StockUpdate.vue -->
<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
    >
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900">
          Atualizar estoque de {{ product.name }}
        </h3>

        <form @submit.prevent="handleSubmit" class="mt-4">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Qtde</label>
            <input
              v-model.number="formData.quantity"
              type="number"
              required
              min="0"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StockUpdate",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        quantity: 0,
      },
    }
  },
  mounted() {
    // Initialize with current quantity if available
    if (this.product.currentQuantity !== undefined) {
      this.formData.quantity = this.product.currentQuantity
    }
  },
  methods: {
    handleSubmit() {
      this.$emit("save", this.formData)
    },
  },
}
</script>
