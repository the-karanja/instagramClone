<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow p-4" style="width: 400px;">

      <h3 class="text-center mb-4">Login</h3>

      <form @submit.prevent="handleLogin">

        <div class="mb-3">
          <label class="form-label">Username</label>
          <input type="text" class="form-control" v-model="username" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" v-model="password" required />
        </div>

        <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>

        <button class="btn btn-dark w-100" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

      </form>

      <hr />
      <p class="text-center mb-0">
        Don't have an account?
        <router-link to="/register">Sign up</router-link>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '@/api/auth'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    const { role, username: user } = await loginUser({
      username: username.value,
      password: password.value,
    })

    // 💾 Save session info for other components to use
    localStorage.setItem('username', user)
    localStorage.setItem('role', role)

    // 🔀 Route by role
    if (role === 'creator') {
      router.push('/dashboard')
    } else {
      router.push('/feed')
    }

  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>