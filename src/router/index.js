import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '@/views/Home'
import AppRegister from '@/views/Register'
import AppLogin from '@/views/Login'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  //   {
  //     path: '/about',
  //     name: 'about',
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import(/* webpackChunkName: "about" */ '@/views/About'),
  //   },
  {
    path: '/register',
    name: 'register',
    component: AppRegister,
  },
  {
    path: '/login',
    name: 'login',
    component: AppLogin,
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings'),
  },
  {
    path: '/createArticle',
    name: 'createArticle',
    component: () => import('@/views/CreateArticle'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
