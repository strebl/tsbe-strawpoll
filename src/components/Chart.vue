<template>
	<canvas height="200"></canvas>
</template>

<script>
import ChartJS from 'chart.js'

ChartJS.defaults.global.responsive = true

export default {
  data () {
    return {
      chart: {}
    }
  },
  props: ['options'],
  events: {
    'initial-data' (poll) {
      var data = poll.options.map(value => value.votes)
      var labels = poll.options.map(value => `${value.name} (${value.votes})`)
      var chartData = {
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#FF6384',
              '#4BC0C0',
              '#FFCE56',
              '#36A2EB',
              '#E67E22',
              '#9b59b6',
              '#34495e'
            ],
            label: 'Result' // for legend
          }
        ],
        labels: labels
      }
      this.createChart(chartData)
    },
    'new-data' (options) {
      var data = options.map(value => value.votes)
      var labels = options.map(value => `${value.name} (${value.votes})`)

      console.log(this.chart.data.datasets[0])

      this.chart.data.datasets[0].data = data
      this.chart.data.labels = labels
      this.chart.update()
    }
  },
  methods: {
    createChart (data) {
      var ctx = this.$el.getContext('2d')

      this.chart = new ChartJS(ctx, {
        type: 'pie',
        data: data
      })
    }
  }
}
</script>