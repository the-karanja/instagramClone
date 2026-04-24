<template>
  <nav class="navbar navbar-dark bg-dark px-3">

    <button class="btn btn-outline-light btn-sm me-2" @click="$emit('toggle-sidebar')">
      ☰
    </button>

    <span class="navbar-brand mb-0">MediaApp</span>

    <div class="ms-auto d-flex align-items-center gap-3">
      <span class="text-white-50 small">{{ username }}</span>
      <button class="btn btn-outline-light btn-sm" @click="logout">
        Logout
      </button>
    </div>

  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router   = useRouter()
const username = localStorage.getItem('username')

const logout = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('role')
  router.push('/login')
}
</script>