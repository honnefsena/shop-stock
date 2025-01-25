<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script>
import Chart from "chart.js/auto"

export default {
  name: "PieChart",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    data: {
      handler() {
        this.updateChart()
      },
      deep: true,
    },
  },
  methods: {
    updateChart() {
      if (this.chart) {
        this.chart.destroy()
      }

      const ctx = this.$refs.chartCanvas.getContext("2d")
      this.chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: this.data.map((d) => d.name),
          datasets: [
            {
              data: this.data.map((d) => d.value),
              backgroundColor: [
                "#4F46E5",
                "#10B981",
                "#F59E0B",
                "#EF4444",
                "#8B5CF6",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      })
    },
  },
  mounted() {
    this.updateChart()
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy()
    }
  },
}
</script>
