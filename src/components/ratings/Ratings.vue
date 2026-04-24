<template>
  <div class="d-flex align-items-center">
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      :class="{ filled: star <= currentRating }"
      @click="rate(star)"
    >
      ★
    </span>
    <small class="ms-2 text-muted">{{ currentRating }}/5</small>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 }
})

const emit = defineEmits(['update:modelValue'])

const currentRating = ref(props.modelValue)

watch(() => props.modelValue, val => {
  currentRating.value = val
})

const rate = (star) => {
  currentRating.value = star
  emit('update:modelValue', star)
}
</script>

<style scoped>
.star {
  cursor: pointer;
  font-size: 1.4rem;
  color: #ccc;
}
.star.filled {
  color: #ffc107; /* Bootstrap yellow */
}
</style>