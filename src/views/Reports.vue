<!-- src/views/Reports.vue -->
<template>
  <div class="container">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Relatórios</h2>
    </div>

    <!-- Report Type Tabs -->
    <div class="mb-6">
      <nav class="flex space-x-4" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="switchTab(tab.name)"
          :disabled="isLoading"
          :class="[
            currentTab === tab.name
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700',
            'px-3 py-2 font-medium text-sm rounded-md',
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          ]"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Loading indicator for tab switching -->
    <Loader v-if="isLoading" text="Carregando relatório..." />

    <!-- Report Content -->
    <div v-else class="mt-6">
      <StockReport v-if="currentTab === 'stock'" />
      <SalesReport v-if="currentTab === 'sales'" />
      <PaymentReport v-if="currentTab === 'payment'" />
      <PublisherReport v-if="currentTab === 'publisher'" />
    </div>
  </div>
</template>

<script>
import StockReport from "@/views/Reports/StockReport.vue"
import SalesReport from "@/views/Reports/SalesReport.vue"
import PaymentReport from "@/views/Reports/PaymentReport.vue"
import PublisherReport from "@/views/Reports/PublisherReport.vue"
import Loader from "@/components/common/Loader.vue"

export default {
  name: "Reports",
  components: {
    StockReport,
    SalesReport,
    PaymentReport,
    PublisherReport,
    Loader,
  },
  data() {
    return {
      currentTab: "stock",
      isLoading: false,
      tabs: [
        { name: "stock", label: "Estoque" },
        { name: "sales", label: "Vendas" },
        { name: "payment", label: "Método de pagto" },
        { name: "publisher", label: "Editora" },
      ],
    }
  },
  methods: {
    async switchTab(tabName) {
      if (this.currentTab === tabName || this.isLoading) return
      
      this.isLoading = true
      this.currentTab = tabName
      
      // Add a small delay to show the loading state
      await new Promise(resolve => setTimeout(resolve, 300))
      this.isLoading = false
    }
  }
}
</script>
