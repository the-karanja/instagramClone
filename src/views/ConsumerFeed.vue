<template>
  <div>
    <h2 class="mb-4">Feed</h2>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-secondary"></div>
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <!-- Posts -->
    <div
      v-for="post in posts"
      :key="post.postId"
      class="card shadow-sm border-0 mb-4 mx-auto"
      style="max-width: 540px;"
    >
      <!-- Post Header -->
      <div class="card-header bg-white d-flex align-items-center gap-2 border-0 pt-3">
        <div
          class="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
          style="width:36px; height:36px; font-size:0.85rem;"
        >
          {{ post.creator ? post.creator[0].toUpperCase() : '?' }}
        </div>
        <span class="fw-semibold">{{ post.creator || 'Unknown' }}</span>
        <span class="text-muted small ms-auto">
          {{ new Date(post.createdAt).toLocaleDateString() }}
        </span>
      </div>

      <!-- Image -->
      <img
        :src="post.imageUrl"
        class="w-100"
        style="max-height: 480px; object-fit: cover;"
        @error="e => e.target.style.display = 'none'"
      />

      <!-- Actions -->
      <div class="card-body pb-1">

        <div class="d-flex align-items-center gap-3 mb-2">

          <!-- Like button -->
          <button
            class="btn btn-sm p-0 border-0 bg-transparent"
            @click="handleLike(post)"
          >
            <span style="font-size: 1.5rem;">
              {{ post.likedByMe ? '❤️' : '🤍' }}
            </span>
          </button>

          <!-- Comment toggle -->
          <button
            class="btn btn-sm p-0 border-0 bg-transparent"
            @click="toggleComments(post.postId)"
            style="font-size: 1.5rem;"
          >
            💬
          </button>

        </div>

        <!-- Likes count -->
        <div class="fw-semibold small mb-1">{{ post.likes || 0 }} likes</div>

        <!-- Title + Caption -->
        <div class="small mb-1">
          <span class="fw-semibold me-1">{{ post.creator || 'Unknown' }}</span>
          <span>{{ post.title }}</span>
        </div>
        <div class="small text-muted mb-2">{{ post.caption }}</div>

        <!-- Comment count toggle -->
        <button
          class="btn btn-sm p-0 border-0 bg-transparent text-muted small"
          @click="toggleComments(post.postId)"
        >
          {{
            expandedPost === post.postId
              ? 'Hide comments'
              : post.comments.length === 0
                ? 'Be the first to comment'
                : `View all ${post.comments.length} comments`
          }}
        </button>

        <!-- Comments dropdown -->
        <div v-if="expandedPost === post.postId" class="mt-2">

          <!-- No comments yet -->
          <div v-if="post.comments.length === 0" class="text-muted small py-1">
            No comments yet
          </div>

          <!-- Existing comments -->
          <div
            v-for="comment in post.comments"
            :key="comment.commentId"
            class="small mb-1 d-flex gap-1"
          >
            <span class="fw-semibold">{{ comment.username }}</span>
            <span>{{ comment.text }}</span>
          </div>

          <!-- Add comment -->
          <div class="d-flex gap-2 mt-2 border-top pt-2">
            <input
              type="text"
              class="form-control form-control-sm"
              placeholder="Add a comment..."
              v-model="commentInputs[post.postId]"
              @keyup.enter="handleComment(post)"
            />
            <button
              class="btn btn-sm btn-dark"
              @click="handleComment(post)"
              :disabled="!commentInputs[post.postId]?.trim()"
            >
              Post
            </button>
          </div>

        </div>

      </div>
    </div>

    <!-- Empty state -->
    <div v-if="!loading && posts.length === 0" class="text-center text-muted py-5">
      <div style="font-size: 3rem;">📭</div>
      <p class="mt-2">No posts yet</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { fetchAllPosts, toggleLike, addComment } from '@/api/auth'

const posts         = ref([])
const loading       = ref(true)
const error         = ref('')
const expandedPost  = ref(null)
const commentInputs = reactive({})

const toggleComments = (postId) => {
  expandedPost.value = expandedPost.value === postId ? null : postId
}

const handleLike = async (post) => {
  // Optimistic update — flip instantly, revert if API fails
  post.likedByMe = !post.likedByMe
  post.likes = (post.likes || 0) + (post.likedByMe ? 1 : -1)

  try {
    await toggleLike(post.postId)
  } catch {
    // Revert on failure
    post.likedByMe = !post.likedByMe
    post.likes = (post.likes || 0) + (post.likedByMe ? 1 : -1)
  }
}

const handleComment = async (post) => {
  const text = commentInputs[post.postId]?.trim()
  if (!text) return

  try {
    const username = localStorage.getItem('username')
    await addComment(post.postId, text)

    // Add locally so it shows instantly without refetching
    post.comments.unshift({
      commentId: `temp-${Date.now()}`,
      username,
      text,
      createdAt: Date.now(),
    })

    commentInputs[post.postId] = ''
  } catch (err) {
    error.value = err.message
  }
}

onMounted(async () => {
  try {
    const data = await fetchAllPosts()
    posts.value = data.posts
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>