import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'
import CreatorDashboard from '@/views/CreatorDashboard.vue'
import ConsumerFeed from '@/views/ConsumerFeed.vue'
import UploadView from '@/components/upload/UploadView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/dashboard',
    name: 'CreatorDashboard',
    component: CreatorDashboard,
    meta: { requiresAuth: true, role: 'creator' }
  },
  {
    path: '/feed',
    name: 'ConsumerFeed',
    component: ConsumerFeed,
    meta: { requiresAuth: true, role: 'consumer' }
  },
  {
    path: '/upload',
    name: 'Upload',
    component: UploadView,
    meta: { requiresAuth: true, role: 'creator' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ Guard runs before every route change
router.beforeEach((to, from, next) => {
  const username = localStorage.getItem('username')
  const role     = localStorage.getItem('role')

  // Route needs auth
  if (to.meta.requiresAuth) {

    // Not logged in at all
    if (!username || !role) {
      return next('/login')
    }

    // Logged in but wrong role
    // e.g. consumer trying to access /dashboard
    if (to.meta.role && to.meta.role !== role) {
      return next(role === 'creator' ? '/dashboard' : '/feed')
    }
  }

  // Already logged in, don't let them see login/register
  if ((to.path === '/login' || to.path === '/register') && username) {
    return next(role === 'creator' ? '/dashboard' : '/feed')
  }

  next()
})

export default router