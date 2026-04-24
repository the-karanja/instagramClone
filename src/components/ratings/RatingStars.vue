<template>
  <div class="d-flex align-items-center">
    
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      :class="{ active: star <= currentValue }"
      @click="selectRating(star)"
    >
      ★
    </span>

    <small class="ms-2 text-muted">
      {{ currentValue }}/5
    </small>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue'])

const currentValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  currentValue.value = val
})

const selectRating = (value) => {
  currentValue.value = value
  emit('update:modelValue', value)
}
</script>

<style scoped>
.star {
  cursor: pointer;
  font-size: 1.5rem;
  color: #ccc;
  transition: 0.2s;
}

.star.active {
  color: #ffc107; /* Bootstrap yellow */
}
</style>