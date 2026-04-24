<template>
  <div class="mb-3 text-center">

    <img
      :src="image"
      class="img-fluid rounded"
      style="max-height:300px;"
    />

  </div>
</template>

<script setup>
defineProps({
  image: String
})
</script>