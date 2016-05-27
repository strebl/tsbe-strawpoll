<template>
  <h1 class="site__title">vote on this strawpoll <a class="btn btn-link btn-sm" href="/">Create Your Own strawpoll</a></h1>
  <div class="well" v-cloak>
    <h1 id="poll__question">{{ poll.question }}</h1>
    <div class="options">
      <div class="option" v-for="(id, option) in poll.options">
        <div class="row">
          <div class="col-md-6" @click="selectOption(option, id)">
            <div class="col-xs-2">
              <input type="radio" name="option" :checked="selectedOption == option">
            </div>
            <div class="col-xs-10 " :class="{ 'bg-primary': optionIsSelected(option) }">{{ option.name }}</div>
          </div>
        </div>
      </div> <!-- /option -->
    </div> <!-- /options -->
    <div class="row">
      <div class="col-md-12">
        <button class="btn btn-primary" :class="{ disabled: !aOptionIsSelected }" :disabled="!aOptionIsSelected" @click="vote(selectedOptionId)">Vote!</button>
        <a href="/{{ pollId }}/r">Result</a>
      </div>
    </div>
  </div>
</template>

<script>
var Firebase = require('firebase')
var baseURL = 'https://tsbe-strawpoll.firebaseio.com/'

export default {
  data () {
    return {
      firepase: {},
      pollId: null,
      poll: {},
      selectedOption: null,
      selectedOptionId: null
    }
  },
  computed: {
    aOptionIsSelected () {
      return this.selectedOption !== null
    }
  },
  methods: {
    optionIsSelected (option) {
      return this.selectedOption === option
    },
    selectOption (option, id) {
      this.selectedOptionId = id
      this.selectedOption = option
    },
    vote (optionId) {
      console.log(this.selectedOption)
      let clientId = window.localStorage.getItem('client_id')

      this.firebase.child('voters/' + clientId).once('value', snapshot => {
        if (snapshot.val() !== null) {
          window.alert('Du hast bereits gevoted!')

          this.$router.go('/' + this.pollId + '/r')
        } else {
          this.firebase.child('voters/' + clientId).set(clientId)
          this.firebase.child('options/' + optionId + '/votes').transaction(currentValue => {
            return currentValue + 1
          })

          this.$router.go('/' + this.pollId + '/r')
        }
      })
    }
  },
  ready () {
    this.firebase = new Firebase(baseURL + 'polls/' + this.$route.params.poll)

    this.pollId = this.$route.params.poll

    this.firebase.once('value', (poll) => {
      console.log('initial data loaded!', poll.val())
      this.poll = poll.val()
    })

    if (!window.localStorage.getItem('client_id')) {
      window.localStorage.setItem('client_id', Math.random().toString(36).substr(2, 16))
    }
  }
}
</script>

<style>
#poll__question:not(:empty)::after {
  content: '?';
  margin-left: 8px;
}
.options {
  margin-bottom: 20px;
}
</style>