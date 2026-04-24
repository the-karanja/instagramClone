<template>
  <div>

    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">Creator Dashboard</h2>
      <button class="btn btn-primary" @click="$router.push('/upload')">
        + New Upload
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
      <div class="col-md-3">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h6 class="text-muted">Total Posts</h6>
            <h3 class="fw-bold">{{ posts.length }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h6 class="text-muted">Total Likes</h6>
            <h3 class="fw-bold">{{ totalLikes }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h6 class="text-muted">Total Comments</h6>
            <h3 class="fw-bold">{{ totalComments }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h6 class="text-muted">Logged in as</h6>
            <h3 class="fw-bold">{{ username }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-secondary"></div>
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <!-- Posts Table -->
    <div v-if="!loading" class="card shadow-sm border-0">
      <div class="card-body">
        <h5 class="fw-bold mb-3">Your Posts</h5>
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Caption</th>
                <th>Likes</th>
                <th>Comments</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="post in posts" :key="post.postId">

                <!-- Post row -->
                <tr
                  class="cursor-pointer"
                  @click="toggleComments(post.postId)"
                  style="cursor: pointer;"
                >
                  <td>
                    <img
                      :src="post.imageUrl"
                      style="width:60px; height:60px; object-fit:cover; border-radius:6px;"
                    />
                  </td>
                  <td class="fw-semibold">{{ post.title }}</td>
                  <td class="text-muted">{{ post.caption }}</td>
                  <td>❤️ {{ post.likes }}</td>
                  <td>
                    💬 {{ post.comments.length }}
                    <span class="text-muted small ms-1">
                      {{ expandedPost === post.postId ? '▲' : '▼' }}
                    </span>
                  </td>
                  <td class="text-muted small">
                    {{ new Date(post.createdAt).toLocaleDateString() }}
                  </td>
                </tr>

                <!-- ✅ Instagram-style comment dropdown -->
                <tr v-if="expandedPost === post.postId">
                  <td colspan="6" class="bg-light p-3">
                    <div v-if="post.comments.length === 0" class="text-muted small">
                      No comments yet
                    </div>
                    <div
                      v-for="comment in post.comments"
                      :key="comment.commentId"
                      class="d-flex align-items-start mb-2"
                    >
                      <div class="bg-white border rounded px-3 py-2 w-100">
                        <span class="fw-semibold me-2">{{ comment.username }}</span>
                        <span>{{ comment.text }}</span>
                        <div class="text-muted" style="font-size: 0.75rem;">
                          {{ new Date(comment.createdAt).toLocaleString() }}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchCreatorPosts } from '@/api/auth'

const router   = useRouter()
const username = localStorage.getItem('username')
const role     = localStorage.getItem('role')

// Extra safety — if somehow they got here without auth, kick them out
if (!username || role !== 'creator') {
  router.push('/login')
}

const posts        = ref([])
const loading      = ref(true)
const error        = ref('')
const expandedPost = ref(null)

const totalLikes    = computed(() => posts.value.reduce((sum, p) => sum + (p.likes || 0), 0))
const totalComments = computed(() => posts.value.reduce((sum, p) => sum + p.comments.length, 0))

const toggleComments = (postId) => {
  expandedPost.value = expandedPost.value === postId ? null : postId
}

onMounted(async () => {
  try {
    // ✅ Always uses the logged-in user's username — no way to spoof it via URL
    const data = await fetchCreatorPosts(username)
    posts.value = data.posts
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>