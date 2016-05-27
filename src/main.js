import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from './components/Create'
import Show from './components/Show'
import Result from './components/Result'

Vue.use(VueRouter)

/* eslint-disable no-new */
var app = Vue.extend({})

var router = new VueRouter({
  history: true
})

router.map({
  '/': {
    component: Create
  },
  '/:poll': {
    component: Show
  },
  '/:poll/r': {
    component: Result
  }
})

router.start(app, '#app')
