import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
        path: '/',
        name: 'Index',
        component: () => import('../views/Index'),
        meta: {
            name: ''
        }
    },{
        path: '/RunBox',
        name: 'RunBox',
        component: () => import('../views/RunBox'),
        meta: {
            name: ''
        }
    },{
        path: '/Door',
        name: 'Door',
        component: () => import('../views/Door'),
        meta: {
            name: ''
        }
    },{
        path: '/Cinema',
        name: 'Cinema',
        component: () => import('../views/Cinema'),
        meta: {
            name: ''
        }
    },{
        path: '/Cinema2',
        name: 'Cinema2',
        component: () => import('../views/Cinema2'),
        meta: {
            name: ''
        }
    },{
        path: '/DateTime',
        name: 'DateTime',
        component: () => import('../views/DateTime'),
        meta: {
            name: ''
        }
    },{
        path: '/IndexDB',
        name: 'IndexDB',
        component: () => import('../views/IndexDB'),
        meta: {
            name: ''
        }
    },{
        path: '/Table',
        name: 'Table',
        component: () => import('../views/Table'),
        meta: {
            name: ''
        }
    },{
        path: '/Css1',
        name: 'Css1',
        component: () => import('../views/Css1'),
        meta: {
            name: ''
        }
    },{
        path: '/Index1',
        name: 'Index1',
        component: () => import('../views/index1'),
        meta: {
            name: ''
        }
    },{
        path: '/Index3',
        name: 'Index3',
        component: () => import('../views/index3'),
        meta: {
            name: ''
        }
    }]
})
