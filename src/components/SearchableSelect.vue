<!-- src/components/SearchableSelect.vue -->
<template>
  <div class="relative">
    <label class="block text-sm font-medium text-gray-700">Produto</label>
    <div class="relative mt-1">
      <input
        type="text"
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        v-model="searchQuery"
        @input="handleInput"
        @focus="showDropdown = true"
        :placeholder="
          selectedProduct ? selectedProduct.name : 'Selecione um Produto'
        "
      />
      <div
        v-if="showDropdown"
        class="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto"
      >
        <ul class="py-1">
          <li
            v-for="product in filteredProducts"
            :key="product.id"
            @click="selectProduct(product)"
            class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ product.name }} - R${{ product.sell_price }}
          </li>
          <li
            v-if="filteredProducts.length === 0"
            class="px-3 py-2 text-gray-500"
          >
            Nenhum produto encontrado
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchableSelect",
  props: {
    products: {
      type: Array,
      required: true,
    },
    modelValue: {
      // Changed from 'value' to 'modelValue'
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      searchQuery: "",
      showDropdown: false,
      selectedProduct: null,
      closeListener: null,
    }
  },
  computed: {
    filteredProducts() {
      const query = this.searchQuery.toLowerCase()
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(query)
      )
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.selectedProduct = this.products.find((p) => p.id === newValue)
          this.searchQuery = this.selectedProduct
            ? this.selectedProduct.name
            : ""
        }
      },
    },
  },
  methods: {
    handleInput() {
      if (this.searchQuery === "") {
        this.clearSelection()
      }
    },
    clearSelection() {
      this.selectedProduct = null
      this.searchQuery = ""
      this.$emit("input", "")
      this.$emit("change", "")
    },
    selectProduct(product) {
      this.selectedProduct = product
      this.searchQuery = product.name
      this.showDropdown = false
      this.$emit("update:modelValue", product.id)
      this.$emit("change", product.id)
    },
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.showDropdown = false
      }
    },
  },
  mounted() {
    this.closeListener = (e) => this.handleClickOutside(e)
    document.addEventListener("click", this.closeListener)
  },
  beforeDestroy() {
    if (this.closeListener) {
      document.removeEventListener("click", this.closeListener)
    }
  },
}
</script>
