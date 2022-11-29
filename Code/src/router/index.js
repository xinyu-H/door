import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld
    },{
        path: '/RunBox',
        name: 'RunBox',
        component: () => import('../views/RunBox')
    },{
        path: '/Index1',
        name: 'Index1',
        component: () => import('../views/index1')
    },{
        path: '/Door',
        name: 'Door',
        component: () => import('../views/Door')
    },{
        path: '/Index3',
        name: 'Index3',
        component: () => import('../views/index3')
    },{
        path: '/Cinema',
        name: 'Cinema',
        component: () => import('../views/Cinema')
    },{
        path: '/Cinema2',
        name: 'Cinema2',
        component: () => import('../views/Cinema2')
    },{
        path: '/DateTime',
        name: 'DateTime',
        component: () => import('../views/DateTime')
    },{
        path: '/',
        name: 'IndexDB',
        component: () => import('../views/IndexDB')
    }
  ]
})
