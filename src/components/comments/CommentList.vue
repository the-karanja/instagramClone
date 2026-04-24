<template>
  <div>
    <CommentItem
      v-for="c in comments"
      :key="c.id"
      :comment="c"
    />
  </div>
</template>

<script setup>
import CommentItem from './CommentItem.vue'

defineProps({
  comments: Array
})
</script>