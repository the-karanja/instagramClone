<template>
  <div class="d-flex mb-3">
    <div class="flex-grow-1">
      <strong>{{ comment.user }}</strong>
      <small class="text-muted ms-2">{{ comment.date }}</small>
      <p class="mb-1">{{ comment.text }}</p>
      <RatingStars v-model="comment.rating" />
    </div>
  </div>
</template>

<script setup>
import RatingStars from '@/components/ratings/RatingStars.vue'

defineProps({
  comment: Object
})
</script>