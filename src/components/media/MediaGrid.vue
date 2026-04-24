<template>
  <div class="row g-4">
    <div
      v-for="item in items"
      :key="item.id"
      class="col-12 col-sm-6 col-md-4 col-lg-3"
    >
      <MediaCard
        :media="item"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import MediaCard from './MediaCard.vue'

defineProps({
  items: Array
})
</script>