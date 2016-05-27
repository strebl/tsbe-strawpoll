<template>
  <h1 class="site__title">Strawpoll Result <a class="btn btn-link btn-sm" href="/">Create Your Own strawpoll</a></h1>
  <div class="well" v-cloak>
    <h1 id="poll__question">{{ poll.question }}</h1>
    <div class="col-md-12">
      <div class="options">
        <ul class="option list-inline">
          <!-- <li v-for="option in poll.options | orderBy 'votes' -1">{{ option.name }} ({{ option.votes }})</li> -->
        </ul> <!-- /option -->
      </div> <!-- /options -->
    </div>
    <div class="col-md-12">
      <div class="chart__container">
        <chart :options="poll.options"></chart>
      </div>   
    </div>
    <div class="row">
      <div class="col-md-12">
        <a class="btn btn-link btn-lg" href="/{{ pollId }}">Not voted yet?</a>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
import Chart from './Chart'
var baseURL = 'https://tsbe-strawpoll.firebaseio.com/'

export default {
  data () {
    return {
      firepase: {},
      pollId: null,
      poll: {}
    }
  },
  computed: {
  },
  methods: {
  },
  components: { Chart },
  ready () {
    this.firebase = new Firebase(baseURL + 'polls/' + this.$route.params.poll)

    this.pollId = this.$route.params.poll

    this.firebase.once('value', (poll) => {
      console.log('initial data loaded!', poll.val())
      this.poll = poll.val()

      this.$broadcast('initial-data', poll.val())
    })

    this.firebase.on('child_changed', (poll) => {
      console.log('child changed!', poll.val())
      this.poll.options = poll.val()

      this.$broadcast('new-data', poll.val())
    })
  }
}
</script>

<style>
.site__title {
  text-transform: uppercase;
  color: black;
  font-size: 2.5em;
}
h1 {
  color: #2196f3;
}
#poll__question:not(:empty)::after {
  content: '?';
  margin-left: 8px;
}
.options {
  margin-bottom: 20px;
  font-size: 2em;
}
.chart_container {
  width:100%;
}
</style>