<template>
  <AppHeader @toggle-sidebar="toggleSidebar" />

  <div class="d-flex">
    <Sidebar v-if="showSidebar && isLoggedIn" />

    <Container>
      <router-view />
    </Container>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import AppHeader from '@/components/layout/AppHeader.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import Container from '@/components/layout/Container.vue'

const route = useRoute()
const showSidebar = ref(true)

// ✅ Reactively checks localStorage on every route change
const isLoggedIn = computed(() => !!localStorage.getItem('username'))

// ✅ Auto hide sidebar on login/register pages
watch(() => route.path, (path) => {
  if (path === '/login' || path === '/register') {
    showSidebar.value = false
  } else {
    showSidebar.value = true
  }
}, { immediate: true })

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
</script>