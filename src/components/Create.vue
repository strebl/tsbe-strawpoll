<template>
  <div class="hello">
    <h1>Create Your Straw Poll</h1>
    <div class="form-group">
      <label for="question">Your Question</label>
      <input type="text" 
              class="form-control"
              id="question" 
              placeholder="What's your question?" 
              v-model="question">
    </div>
    <div class="form-group">
      <label for="option">Your option</label>
      <input type="text" 
              class="form-control" 
              id="option" 
              placeholder="Type an option an press enter..." 
              v-model="newOption" 
              @keyup.enter="addOption">
    </div>
    <div class="option-list">
      <p class="bg-primary" v-for="option in options">
        {{ option.name }}
        <span class="remove-icon" @click="removeOption(option)">&times;</span>
      </p>
    </div>
    <button class="btn btn-primary" :class="{ disabled: !enoughOptions }" :disabled="!enoughOptions" @click="createPoll()">Create Poll</button>
  </div>
</template>

<script>
var Firebase = require('firebase')
var baseURL = 'https://tsbe-strawpoll.firebaseio.com/'
var Polls = new Firebase(baseURL + 'polls')
import Vue from 'vue'

export default {
  name: 'CreatePoll',
  data () {
    return {
      question: '',
      newOption: '',
      options: []
    }
  },
  computed: {
    enoughOptions: function () {
      return this.options.length >= 2
    }
  },
  methods: {
    addOption: function () {
      var filter = Vue.filter('filterBy')
      var newOption = this.newOption.trim()

      if (filter(this.options, newOption, 'name').length === 0) {
        this.options.push({
          name: newOption,
          votes: 0
        })
        this.newOption = ''
      }
    },
    removeOption: function (option) {
      this.options.$remove(option)
    },
    createPoll () {
      if (this.question.slice(-1) === '?') {
        this.question = this.question.slice(0, -1)
      }

      var poll = Polls.push({ question: this.question, options: this.options, voters: [] })
      console.log(poll.key())
      this.$router.go('/' + poll.key())
    }
  }
}
</script>

<style>
  .option-list p {
    text-align: left;
    padding: 15px;
    position: relative;
  }
  .remove-icon {
    position: absolute;
    right: 5px;
    background: #077DDA;
    height: 100%;
    top: 0;
    right: 0;
    padding: 10px;
    font-size: 2em;
    line-height: 1;
  }
</style>