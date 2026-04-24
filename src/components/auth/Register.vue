<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-5">
        <div class="card shadow-sm">
          <div class="card-body">

            <h3 class="text-center mb-4">Create Account</h3>

            <form @submit.prevent="handleRegister">

              <div class="mb-3">
                <label class="form-label">Username</label>
                <input v-model="form.username" type="text" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="form.password" type="password" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Confirm Password</label>
                <input v-model="form.confirmPassword" type="password" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">I am a...</label>
                <select v-model="form.role" class="form-select" required>
                  <option value="">Select role</option>
                  <option value="creator">Creator</option>
                  <option value="consumer">Consumer</option>
                </select>
              </div>

              <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>

              <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                {{ loading ? 'Registering...' : 'Register' }}
              </button>

              <p class="text-center mt-3 mb-0">
                Already have an account?
                <router-link to="/login">Sign in</router-link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ✅ Success popup -->
  <div v-if="success" class="position-fixed top-0 start-50 translate-middle-x mt-3" style="z-index: 9999;">
    <div class="alert alert-success shadow d-flex align-items-center gap-2">
      <span>✅ Account created! Redirecting to login...</span>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '@/api/auth'

const router = useRouter()

const form = reactive({ username: '', password: '', confirmPassword: '', role: '' })
const error = ref('')
const loading = ref(false)
const success = ref(false)

const handleRegister = async () => {
  error.value = ''

  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true
  try {
    await registerUser({
      username: form.username,
      password: form.password,
      role: form.role,
    })

    success.value = true
    setTimeout(() => router.push('/login'), 2000)

  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>