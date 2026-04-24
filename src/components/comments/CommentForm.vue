<template>
  <form @submit.prevent="submitComment">
    <div class="mb-3">
      <label class="form-label">Your Comment</label>
      <textarea
        class="form-control"
        v-model="text"
        rows="3"
        required
      ></textarea>
    </div>

    <div class="mb-3">
      <label class="form-label">Rating</label>
      <RatingStars v-model="rating" />
    </div>

    <button class="btn btn-primary" type="submit">
      Submit
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import RatingStars from '@/components/ratings/RatingStars.vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['add-comment'])

const text = ref('')
const rating = ref(0)

const submitComment = () => {
  emit('add-comment', { text: text.value, rating: rating.value, user: 'You', date: new Date().toLocaleString() })
  text.value = ''
  rating.value = 0
}
</script>