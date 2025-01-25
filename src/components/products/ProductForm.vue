<!-- src/components/products/ProductForm.vue -->
<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
    >
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900">
          {{ product ? "Edit Product" : "Add New Product" }}
        </h3>
        <form @submit.prevent="handleSubmit" class="mt-4">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Nome</label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700"
              >Preço Custo</label
            >
            <input
              v-model.number="formData.cost_price"
              type="number"
              step="0.01"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700"
              >Preço Venda</label
            >
            <input
              v-model.number="formData.sell_price"
              type="number"
              step="0.01"
              required
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
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductForm",
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formData: {
        name: "",
        cost_price: 0,
        sell_price: 0,
      },
    }
  },
  created() {
    if (this.product) {
      this.formData = { ...this.product }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit("save", this.formData)
    },
  },
}
</script>
