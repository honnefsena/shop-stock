<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script>
import Chart from "chart.js/auto"

export default {
  name: "LineChart",
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
        type: "line",
        data: {
          labels: this.data.map((d) => d.date),
          datasets: [
            {
              label: "Sales",
              data: this.data.map((d) => d.amount),
              borderColor: "#4F46E5",
              tension: 0.1,
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
