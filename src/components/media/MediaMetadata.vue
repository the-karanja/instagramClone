<template>
  <div>
    <h4>{{ media.title }}</h4>

    <p class="text-muted">
      {{ media.description }}
    </p>

    <div class="d-flex gap-3">
      <span>👁 {{ media.views }}</span>
      <span>⭐ {{ media.rating }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  media: Object
})
</script>