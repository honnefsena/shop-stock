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
          @click="currentTab = tab.name"
          :class="[
            currentTab === tab.name
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700',
            'px-3 py-2 font-medium text-sm rounded-md',
          ]"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Report Content -->
    <div class="mt-6">
      <StockReport v-if="currentTab === 'stock'" />
      <SalesReport v-if="currentTab === 'sales'" />
      <PaymentReport v-if="currentTab === 'payment'" />
    </div>
  </div>
</template>

<script>
import StockReport from "@/views/Reports/StockReport.vue"
import SalesReport from "@/views/Reports/SalesReport.vue"
import PaymentReport from "@/views/Reports/PaymentReport.vue"

export default {
  name: "Reports",
  components: {
    StockReport,
    SalesReport,
    PaymentReport,
  },
  data() {
    return {
      currentTab: "stock",
      tabs: [
        { name: "stock", label: "Estoque" },
        { name: "sales", label: "Vendas" },
        { name: "payment", label: "Método de pagto" },
      ],
    }
  },
}
</script>
