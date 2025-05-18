import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import CatalogueView from '../views/CatalogueView.vue'
import FavorisView from '../views/FavorisView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminView from '@/views/AdminView.vue'
import CommentaireView from '@/views/CommentaireView.vue'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: AccueilView
  },
  {
    path: '/Catalogue',
    name: 'catalogue',
    component: CatalogueView
  },
  {
    path: '/Favoris',
    name: 'favoris',
    component: FavorisView
  },
  {
    path: '/Login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/Register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/commentaire',
    name: 'Commentaire',
    component: CommentaireView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (to.meta.requiresAdmin && user?.role !== 'admin') {
    next('/login')
  } else {
    next()
  }
})
export default router
