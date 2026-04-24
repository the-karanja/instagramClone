<template>
  <div class="card p-4 shadow">

    <!-- File Input — images only -->
    <div class="mb-3">
      <label class="form-label fw-semibold">Select Image</label>
      <input
        type="file"
        class="form-control"
        accept="image/*"
        @change="handleFile"
      />
      <div v-if="fileError" class="text-danger small mt-1">{{ fileError }}</div>
    </div>

    <!-- Preview -->
    <UploadPreview v-if="previewUrl" :image="previewUrl" />

    <!-- Metadata -->
    <MetadataForm v-model="metadata" />

    <!-- Error -->
    <div v-if="error" class="alert alert-danger py-2 mt-3">{{ error }}</div>

    <!-- Submit -->
    <button
      class="btn btn-dark w-100 mt-3"
      @click="upload"
      :disabled="!file || loading"
    >
      <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
      {{ loading ? 'Uploading...' : 'Publish' }}
    </button>

  </div>

  <!-- Success toast -->
  <div v-if="success" class="position-fixed top-0 start-50 translate-middle-x mt-3" style="z-index: 9999;">
    <div class="alert alert-success shadow d-flex align-items-center gap-2">
      ✅ Post published successfully!
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UploadPreview from './UploadPreview.vue'
import MetadataForm from './MetadataForm.vue'
import { uploadPost } from '@/api/auth'
import { useRouter } from 'vue-router'
const router = useRouter()

const file       = ref(null)
const previewUrl = ref(null)
const fileError  = ref('')
const error      = ref('')
const loading    = ref(false)
const success    = ref(false)

const metadata = ref({
  title: '',
  caption: '',
  location: '',
  people: ''
})

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

const handleFile = (event) => {
  fileError.value = ''
  const selected = event.target.files[0]

  if (!selected) return

  // ✅ Validate it's an image
  if (!ALLOWED_TYPES.includes(selected.type)) {
    fileError.value = 'Only JPEG, PNG, GIF, or WEBP images are allowed'
    file.value = null
    previewUrl.value = null
    return
  }

  // ✅ Limit to 5MB
  if (selected.size > 5 * 1024 * 1024) {
    fileError.value = 'Image must be under 5MB'
    file.value = null
    previewUrl.value = null
    return
  }

  file.value = selected
  previewUrl.value = URL.createObjectURL(selected)
}

// Convert file to base64 for Lambda
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1]) // strip data:image/...;base64,
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const upload = async () => {
  if (!file.value) return
  error.value = ''
  loading.value = false

  if (!metadata.value.title.trim()) {
    error.value = 'Please add a title before publishing'
    return
  }

  loading.value = true
  try {
    const fileContent = await toBase64(file.value)

    const result = await uploadPost({
      fileName:    `${Date.now()}-${file.value.name}`,
      fileContent,
      contentType: file.value.type,
      title:       metadata.value.title,
      caption:     metadata.value.caption,
    })

    console.log('Uploaded:', result.imageUrl)

    // Reset form
    file.value = null
    previewUrl.value = null
    metadata.value = { title: '', caption: '', location: '', people: '' }

    success.value = true
    setTimeout(() => router.push('/dashboard'), 2000)

  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>