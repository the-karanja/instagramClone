<template>
  <div class="card h-100 shadow-sm" @click="$emit('select', media)">
    
    <img
      :src="media.thumbnail"
      class="card-img-top"
      alt="media"
      style="height: 180px; object-fit: cover;"
    />

    <div class="card-body">
      <h6 class="card-title mb-1">{{ media.title }}</h6>
      <small class="text-muted">
        {{ media.views }} views
      </small>
    </div>

  </div>
</template>

<script setup>
defineProps({
  media: Object
})
</script>