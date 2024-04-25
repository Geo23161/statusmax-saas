import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path : '/login',
    component : () => import('@/views/LoginPage.vue')
  },
  {
    path : '/post/:id',
    component : () => import('@/views/PostPage.vue')
  },
  {
    path : '/prospect/:id',
    component : () => import('@/views/ProspectPage.vue')
  },
  {
    path : '/result/:id/:slug',
    component : () => import('@/views/ResultPage.vue')
  },
  {
    path : '/register',
    component : () => import('@/views/RegisterPage.vue')
  },
  {
    path : '/create',
    component : () => import('@/views/CreatePost.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
