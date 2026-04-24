<template>
  <div class="bg-light border-end vh-100 p-3" style="width: 220px;">
    <ul class="nav flex-column">
      
      <li class="nav-item">
        <router-link class="nav-link" to="/dashboard">
          Dashboard
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-link" to="/upload">
          Upload
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-link" to="/feed">
          Library
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script setup>
</script>