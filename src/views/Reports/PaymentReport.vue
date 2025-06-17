<!-- src/views/Reports/PaymentReport.vue -->
<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="mb-6">
      <h3 class="text-lg font-medium text-gray-900">
        Relatório por Método de Pagamento
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        Análise de Vendas por Método de Pagamento
      </p>
    </div>

    <!-- Date Range Filter -->
    <div class="mb-6">
      <div class="flex space-x-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Data início</label
          >
          <input
            v-model="dateRange.start"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Data final</label
          >
          <input
            v-model="dateRange.end"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div class="flex items-end">
          <button
            @click="fetchSalesData"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Aplicar filtro
          </button>
        </div>
      </div>
    </div>

    <!-- Loading indicator -->
    <Loader v-if="isLoading" text="Carregando..." />

    <div v-else>
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
        <div
          v-for="(summary, method) in paymentSummary"
          :key="method"
          class="bg-gray-50 overflow-hidden shadow rounded-lg"
        >
          <div class="px-4 py-5 sm:p-6">
            <dt class="text-sm font-medium text-gray-500 truncate">
              {{ formatPaymentMethod(method) }}
            </dt>
            <dd class="mt-1 text-3xl font-semibold text-gray-900">
              ${{ summary.total.toFixed(2) }}
            </dd>
            <p class="mt-1 text-sm text-gray-500">{{ summary.count }} sales</p>
          </div>
        </div>
      </div>

      <!-- Payment Method Chart -->
      <div class="mb-6">
        <h4 class="text-base font-medium text-gray-900 mb-4">
          Distribuição de métodos de pagto
        </h4>
        <div class="h-64">
          <PieChart :data="paymentDistributionData" />
        </div>
      </div>

      <!-- Payment Method Table -->
      <div class="mb-6">
        <h4 class="text-base font-medium text-gray-900 mb-4">
          Vendas por Método de Pagamento
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Método de Pagamento
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Número de Vendas
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  QTDE Total
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Média de Vendas
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  %
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(data, method) in paymentSummary" :key="method">
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ formatPaymentMethod(method) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ data.count }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  ${{ data.total.toFixed(2) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  ${{ (data.total / data.count).toFixed(2) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ ((data.total / totalSalesAmount) * 100).toFixed(1) }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Monthly Trends -->
      <div class="mb-6">
        <h4 class="text-base font-medium text-gray-900 mb-4">
          Método de pagamento: tendências mensais
        </h4>
        <div class="h-64">
          <LineChart :data="monthlyTrendsData" />
        </div>
      </div>

      <!-- Export Button -->
      <div class="flex justify-end">
        <button
          @click="exportReport"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Exportar relatório
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import { LineChart, PieChart } from "@/components/charts"

export default {
  name: "PaymentReport",
  components: {
    LineChart,
    PieChart,
  },
  data() {
    return {
      dateRange: {
        start: this.getDefaultStartDate(),
        end: this.getDefaultEndDate(),
      },
      salesData: [],
      isLoading: false,
    }
  },
  computed: {
    paymentSummary() {
      // Group sales by payment method and calculate totals
      const summary = {}

      this.salesData.forEach((sale) => {
        const method = sale.payment_method || "unknown"

        if (!summary[method]) {
          summary[method] = {
            count: 0,
            total: 0,
          }
        }

        summary[method].count += 1
        summary[method].total += parseFloat(sale.total_amount)
      })

      return summary
    },

    totalSalesAmount() {
      return Object.values(this.paymentSummary).reduce(
        (sum, data) => sum + data.total,
        0
      )
    },

    paymentDistributionData() {
      return Object.entries(this.paymentSummary).map(([method, data]) => ({
        name: this.formatPaymentMethod(method),
        value: data.total,
      }))
    },

    monthlyTrendsData() {
      // Group sales by month and payment method
      const monthlyData = {}

      this.salesData.forEach((sale) => {
        const date = new Date(sale.sale_date)
        const month = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`
        const method = sale.payment_method || "unknown"

        if (!monthlyData[month]) {
          monthlyData[month] = {
            month,
            pix: 0,
            cartao: 0,
            dinheiro: 0,
            "pix + cartao": 0,
            "pix + dinheiro": 0,
            "cartao + dinheiro": 0,
            unknown: 0,
          }
        }

        monthlyData[month][method] += parseFloat(sale.total_amount)
      })

      // Convert to array and sort by month
      return Object.values(monthlyData).sort((a, b) =>
        a.month.localeCompare(b.month)
      )
    },
  },
  methods: {
    ...mapActions("sales", ["fetchSaleReport"]),

    getDefaultStartDate() {
      const date = new Date()
      date.setMonth(date.getMonth() - 3) // Last 3 months by default
      return date.toISOString().split("T")[0]
    },

    getDefaultEndDate() {
      return new Date().toISOString().split("T")[0]
    },

    formatPaymentMethod(method) {
      const methods = {
        pix: "PIX",
        cartao: "Cartão",
        dinheiro: "Dinheiro",
        "pix + cartao": "PIX + Cartão",
        "pix + dinheiro": "PIX + Dinheiro",
        "cartao + dinheiro": "Cartão + Dinheiro",
        unknown: "-",
      }

      return methods[method] || method
    },

    async fetchSalesData() {
      this.isLoading = true
      try {
        const response = await this.fetchSaleReport({
          startDate: this.dateRange.start,
          endDate: this.dateRange.end,
        })

        // Group the results by sale ID to avoid duplicate counting
        const salesMap = {}

        response.data.forEach((item) => {
          if (!salesMap[item.id]) {
            salesMap[item.id] = {
              id: item.id,
              sale_date: item.sale_date,
              total_amount: item.total_amount,
              payment_method: item.payment_method,
            }
          }
        })

        this.salesData = Object.values(salesMap)
      } catch (error) {
        console.error("Error fetching payment report data:", error)
      } finally {
        this.isLoading = false
      }
    },

    exportReport() {
      // Create CSV content
      const summaryRows = Object.entries(this.paymentSummary).map(
        ([method, data]) => [
          this.formatPaymentMethod(method),
          data.count,
          data.total.toFixed(2),
          (data.total / data.count).toFixed(2),
          ((data.total / this.totalSalesAmount) * 100).toFixed(1) + "%",
        ]
      )

      const csvContent = [
        // Header
        ["Report Period:", `${this.dateRange.start} to ${this.dateRange.end}`],
        ["Total Sales Amount:", `$${this.totalSalesAmount.toFixed(2)}`],
        [""],
        [
          "Payment Method",
          "Number of Sales",
          "Total Amount",
          "Average Sale",
          "Percentage",
        ],
        // Summary data
        ...summaryRows,
        [""],
        ["Monthly Breakdown"],
        ["Month", "PIX", "Cartão", "Dinheiro", "PIX + Cartão", "PIX + Dinheiro", "Cartão + Dinheiro", "-"],
        // Monthly data
        ...this.monthlyTrendsData.map((month) => [
          month.month,
          month.pix.toFixed(2),
          month.cartao.toFixed(2),
          month.dinheiro.toFixed(2),
          month["pix + cartao"].toFixed(2),
          month["pix + dinheiro"].toFixed(2),
          month["cartao + dinheiro"].toFixed(2),
          month.unknown.toFixed(2),
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n")

      // Create and trigger download
      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `payment-report-${this.dateRange.start}-to-${this.dateRange.end}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    },
  },
  mounted() {
    this.fetchSalesData()
  },
}
</script>
