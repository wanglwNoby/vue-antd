import Vue from 'vue'
import VueRouter from 'vue-router'

const Error = () => import('./pages/error.vue')
const Login = () => import('./pages//login/login.vue')
const Home = () => import('./pages/home/home.vue')

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            beforeEnter: (to, from, next) => {
                if(!sessionStorage.getItem('empBasic')){
                    next('/login')
                }
                next()
            }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '*',
            component: Error,
            beforeEnter: (to, from, next) => {
                if(!sessionStorage.getItem('empBasic')){
                    next('/login')
                }
                next()
            }
        }
    ]
})

export default router