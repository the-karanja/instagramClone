<template>
  <div class="mt-3">

    <div class="mb-2">
      <input
        type="text"
        class="form-control"
        placeholder="Title"
        v-model="model.title"
      />
    </div>

    <div class="mb-2">
      <textarea
        class="form-control"
        placeholder="Caption"
        v-model="model.caption"
      ></textarea>
    </div>

    <div class="mb-2">
      <input
        type="text"
        class="form-control"
        placeholder="Location"
        v-model="model.location"
      />
    </div>

    <div class="mb-2">
      <input
        type="text"
        class="form-control"
        placeholder="People Present"
        v-model="model.people"
      />
    </div>

  </div>
</template>

<script setup>
const model = defineModel()
</script>