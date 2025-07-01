<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="mb-6">
      <h3 class="text-lg font-medium text-gray-900">Relatório por Editora</h3>
      <p class="mt-1 text-sm text-gray-500">
        Análise de vendas por editora e métricas de desempenho
      </p>
    </div>

    <!-- Filtros -->
    <div class="mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Data Inicial</label>
          <input
            v-model="dateRange.start"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Data Final</label>
          <input
            v-model="dateRange.end"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Editora</label>
          <select
            v-model="selectedPublisher"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Todas as editoras</option>
            <option
              v-for="publisher in publishers"
              :key="publisher.id"
              :value="publisher.id"
            >
              {{ publisher.name }} ({{ publisher.product_count }} produtos)
            </option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="fetchPublisherData"
            :disabled="isLoading"
            class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Carregando...' : 'Aplicar Filtro' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading indicator -->
    <Loader v-if="isLoading" text="Carregando dados por editora..." />

    <div v-else-if="publisherData.length > 0">
      <!-- Cartões de Resumo -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
        <div class="bg-gray-50 overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dt class="text-sm font-medium text-gray-500 truncate">
              Receita Total
            </dt>
            <dd class="mt-1 text-3xl font-semibold text-gray-900">
              R$ {{ totalRevenue ? totalRevenue.toFixed(2) : 0 }}
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
              Itens Vendidos
            </dt>
            <dd class="mt-1 text-3xl font-semibold text-gray-900">
              {{ totalItemsSold }}
            </dd>
          </div>
        </div>
        <div class="bg-gray-50 overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dt class="text-sm font-medium text-gray-500 truncate">
              Preço Médio
            </dt>
            <dd class="mt-1 text-3xl font-semibold text-gray-900">
              R$ {{ averageItemPrice.toFixed(2) }}
            </dd>
          </div>
        </div>
      </div>

      <!-- Gráfico de Receita por Editora -->
      <div class="mb-6">
        <h4 class="text-base font-medium text-gray-900 mb-4">
          Receita por Editora
        </h4>
        <div class="h-64">
          <PieChart :data="pieChartData" />
        </div>
      </div>

      <!-- Tabela de Dados por Editora -->
      <div class="mb-6">
        <h4 class="text-base font-medium text-gray-900 mb-4">
          Dados por Editora ({{ publisherData.length }} editoras)
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Editora
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vendas
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Itens Vendidos
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Quantidade Total
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Receita
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Preço Médio
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="publisher in publisherData" 
                :key="publisher.publisher_id"
                class="hover:bg-gray-50 cursor-pointer"
                @click="togglePublisherDetails(publisher.publisher_id)"
              >
                <td class="px-6 py-4 text-sm font-medium text-gray-900">
                  {{ publisher.publisher_name }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ publisher.total_sales }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ publisher.total_items_sold }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ publisher.total_quantity_sold }}
                </td>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">
                  R$ {{ publisher.total_revenue ? parseFloat(publisher.total_revenue).toFixed(2) : 0 }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  R$ {{ publisher.average_item_price ? parseFloat(publisher.average_item_price).toFixed(2) : 0 }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Detalhes das Vendas por Editora -->
      <div v-for="publisher in publisherData" :key="`details-${publisher.publisher_id}`">
        <div 
          v-if="expandedPublishers.includes(publisher.publisher_id)"
          class="mb-6 bg-gray-50 rounded-lg p-4"
        >
          <h5 class="text-sm font-medium text-gray-900 mb-3">
            Detalhes das Vendas - {{ publisher.publisher_name }}
          </h5>
          <div class="space-y-3">
            <div 
              v-for="sale in publisher.sales" 
              :key="`${publisher.publisher_id}-${sale.sale_date}`"
              class="bg-white rounded-md p-3 shadow-sm"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-900">
                  Venda em {{ formatDate(sale.sale_date) }}
                </span>
              </div>
              <div class="space-y-1">
                <div 
                  v-for="item in sale.items" 
                  :key="`${sale.sale_date}-${item.product_name}-${item.size}`"
                  class="text-xs text-gray-600 flex justify-between"
                >
                  <span>
                    {{ item.product_name }} - Tamanho: {{ item.size }} - Qtd: {{ item.quantity }}
                  </span>
                  <span class="font-medium">
                    R$ {{ parseFloat(item.unit_price).toFixed(2) }}
                    <span v-if="item.discount_percentage > 0" class="text-green-600 ml-1">
                      ({{ item.discount_percentage }}% desc.)
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado vazio -->
    <div v-else-if="!isLoading" class="text-center py-12">
      <div class="text-gray-500">
        <p class="text-lg font-medium">Nenhum dado encontrado</p>
        <p class="text-sm">Tente ajustar os filtros ou selecionar um período diferente.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { salesService, publisherService } from "@/services/api"
import Loader from "@/components/common/Loader.vue"
import PieChart from "@/components/charts/PieChart.vue"

export default {
  name: "PublisherReport",
  components: {
    Loader,
    PieChart,
  },
  data() {
    return {
      dateRange: {
        start: "",
        end: "",
      },
      selectedPublisher: "",
      publishers: [],
      publisherData: [],
      isLoading: false,
      expandedPublishers: [],
    }
  },
  computed: {
    totalRevenue() {
      return this.publisherData.reduce((sum, publisher) => {
        return sum + parseFloat(publisher.total_revenue)
      }, 0)
    },
    totalSales() {
      return this.publisherData.reduce((sum, publisher) => {
        return sum + publisher.total_sales
      }, 0)
    },
    totalItemsSold() {
      return this.publisherData.reduce((sum, publisher) => {
        return sum + publisher.total_items_sold
      }, 0)
    },
    averageItemPrice() {
      if (this.totalItemsSold === 0) return 0
      return this.totalRevenue / this.totalItemsSold
    },
    pieChartData() {
      return this.publisherData.map(publisher => ({
        name: publisher.publisher_name,
        value: parseFloat(publisher.total_revenue),
        color: this.getRandomColor(publisher.publisher_id)
      }))
    }
  },
  methods: {
    async fetchPublishers() {
      try {
        const response = await publisherService.getAll()
        this.publishers = response.data.data || []
      } catch (error) {
        console.error("Erro ao carregar editoras:", error)
        this.publishers = []
      }
    },
    async fetchPublisherData() {
      this.isLoading = true
      try {
        const params = {}
        
        if (this.dateRange.start) {
          params.startDate = this.dateRange.start
        }
        if (this.dateRange.end) {
          params.endDate = this.dateRange.end
        }
        if (this.selectedPublisher) {
          params.publisherId = this.selectedPublisher
        }

        const response = await salesService.getPublisherReport(params)
        this.publisherData = response.data.data || []
      } catch (error) {
        console.error("Erro ao carregar dados por editora:", error)
        this.publisherData = []
      } finally {
        this.isLoading = false
      }
    },
    togglePublisherDetails(publisherId) {
      const index = this.expandedPublishers.indexOf(publisherId)
      if (index > -1) {
        this.expandedPublishers.splice(index, 1)
      } else {
        this.expandedPublishers.push(publisherId)
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    getRandomColor(seed) {
      const colors = [
        '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
        '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
      ]
      return colors[seed % colors.length]
    }
  },
  mounted() {
    this.fetchPublishers()
    // Definir período padrão (últimos 30 dias)
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30)
    
    this.dateRange.end = endDate.toISOString().split('T')[0]
    this.dateRange.start = startDate.toISOString().split('T')[0]
    
    this.fetchPublisherData()
  }
}
</script> 