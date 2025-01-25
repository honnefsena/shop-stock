<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="mb-6">
      <h3 class="text-lg font-medium text-gray-900">Relatório de Vendas</h3>
      <p class="mt-1 text-sm text-gray-500">
        Análise de vendas e métricas de desempenho
      </p>
    </div>

    <!-- Filtro de Intervalo de Datas -->
    <div class="mb-6">
      <div class="flex space-x-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Data Inicial</label
          >
          <input
            v-model="dateRange.start"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Data Final</label
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
            Aplicar Filtro
          </button>
        </div>
      </div>
    </div>

    <!-- Cartões de Resumo -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
      <div class="bg-gray-50 overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">
            Receita Total
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            R$ {{ totalRevenue.toFixed(2) }}
          </dd>
        </div>
      </div>
      <div class="bg-gray-50 overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">
            Vendas Totais
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {{ totalSales }}
          </dd>
        </div>
      </div>
      <div class="bg-gray-50 overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">
            Valor Médio de Venda
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            R$ {{ averageSaleValue.toFixed(2) }}
          </dd>
        </div>
      </div>
    </div>

    <!-- Gráfico de Vendas -->
    <div class="mb-6">
      <h4 class="text-base font-medium text-gray-900 mb-4">
        Tendência de Vendas
      </h4>
      <div class="h-64">
        <LineChart :data="salesTrendData" />
      </div>
    </div>

    <!-- Tabela de Produtos Mais Vendidos -->
    <div class="mb-6">
      <h4 class="text-base font-medium text-gray-900 mb-4">
        Produtos Mais Vendidos
      </h4>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Produto
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Unidades Vendidas
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Receita
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Preço Médio
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in topProducts" :key="product.id">
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ product.name }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ product.unitsSold }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                R${{ product.revenue.toFixed(2) }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                R${{ product.averagePrice.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Gráfico de Distribuição por Tamanho -->
    <div class="mb-6">
      <h4 class="text-base font-medium text-gray-900 mb-4">
        Vendas por Tamanho
      </h4>
      <div class="h-64">
        <PieChart :data="sizeDistributionData" />
      </div>
    </div>

    <!-- Botão de Exportação -->
    <div class="flex justify-end">
      <button
        @click="exportReport"
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Exportar Relatório
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import LineChart from "@/components/charts/LineChart.vue"
import PieChart from "@/components/charts/PieChart.vue"

export default {
  name: "SalesReport",
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
    totalRevenue() {
      if (!this.salesData?.length) return 0
      return this.salesData.reduce(
        (sum, sale) => sum + parseFloat(sale.total_amount || 0),
        0
      )
    },
    totalSales() {
      return this.salesData?.length || 0
    },
    averageSaleValue() {
      if (!this.totalSales) return 0
      return this.totalRevenue / this.totalSales
    },
    salesTrendData() {
      // Group sales by date and calculate daily totals
      const dailySales = this.groupSalesByDate()
      return Object.keys(dailySales).map((date) => ({
        date,
        amount: dailySales[date],
      }))
    },
    topProducts() {
      const products = {}
      this.salesData.forEach((sale) => {
        sale.items.forEach((item) => {
          if (!products[item.product_id]) {
            products[item.product_id] = {
              id: item.product_id,
              name: item.product_name,
              unitsSold: 0,
              revenue: 0,
              totalPrice: 0,
            }
          }
          products[item.product_id].unitsSold += item.quantity
          const itemTotal =
            item.quantity *
            item.unit_price *
            (1 - item.discount_percentage / 100)
          products[item.product_id].revenue += itemTotal
          products[item.product_id].totalPrice +=
            item.unit_price * item.quantity
        })
      })

      return Object.values(products)
        .map((product) => ({
          ...product,
          averagePrice: product.totalPrice / product.unitsSold,
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)
    },
    sizeDistributionData() {
      const sizeCount = {}
      this.salesData.forEach((sale) => {
        sale.items.forEach((item) => {
          sizeCount[item.size] = (sizeCount[item.size] || 0) + item.quantity
        })
      })

      return Object.entries(sizeCount).map(([size, count]) => ({
        name: size,
        value: count,
      }))
    },
  },
  methods: {
    ...mapActions("sales", ["fetchSaleReport"]),

    getDefaultStartDate() {
      const date = new Date()
      date.setMonth(date.getMonth() - 1)
      return date.toISOString().split("T")[0]
    },

    getDefaultEndDate() {
      return new Date().toISOString().split("T")[0]
    },

    groupSalesByDate() {
      const dailySales = {}
      this.salesData.forEach((sale) => {
        const date = sale.sale_date.split("T")[0]
        dailySales[date] = (dailySales[date] || 0) + sale.total_amount
      })
      return dailySales
    },

    async fetchSalesData() {
      this.isLoading = true
      try {
        const response = await this.fetchSaleReport({
          startDate: this.dateRange.start,
          endDate: this.dateRange.end,
        })
        this.salesData = response.data || []
      } catch (error) {
        console.error("Error fetching sales data:", error)
        this.salesData = []
      } finally {
        this.isLoading = false
      }
    },

    exportReport() {
      // Create CSV content
      const csvContent = [
        // Header
        [
          "Date",
          "Sale ID",
          "Product",
          "Size",
          "Qtde",
          "Unit Price",
          "Discount",
          "Total",
        ],
        // Data rows
        ...this.salesData.flatMap((sale) =>
          sale.items.map((item) => [
            sale.sale_date.split("T")[0],
            sale.id,
            item.product_name,
            item.size,
            item.quantity,
            item.unit_price,
            `${item.discount_percentage}%`,
            item.quantity *
              item.unit_price *
              (1 - item.discount_percentage / 100),
          ])
        ),
      ]
        .map((row) => row.join(","))
        .join("\n")

      // Create and trigger download
      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `sales-report-${this.dateRange.start}-to-${this.dateRange.end}.csv`
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
