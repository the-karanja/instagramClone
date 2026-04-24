<template>
  <div v-if="media" class="modal fade show d-block"
       style="background: rgba(0,0,0,0.6);">

    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">

        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title">{{ media.title }}</h5>
          <button class="btn-close" @click="$emit('close')"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">

          <div class="row">

            <!-- LEFT SIDE -->
            <div class="col-md-7">
              <img
                :src="media.thumbnail"
                class="img-fluid mb-3"
              />

              <MediaMetadata :media="media" />

              <hr />

              <!-- ⭐ Rate This Media -->
              <h6>Rate This</h6>
              <RatingStars v-model="userRating" />
            </div>

            <!-- RIGHT SIDE -->
            <div class="col-md-5">

              <h6>Comments</h6>

              <CommentList :comments="comments" />

              <hr />

              <CommentForm @add-comment="addComment" />

            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MediaMetadata from './MediaMetadata.vue'
import CommentList from '@/components/comments/CommentList.vue'
import CommentForm from '@/components/comments/CommentForm.vue'
import RatingStars from '@/components/ratings/RatingStars.vue'

defineProps({
  media: Object
})

const userRating = ref(0)

const comments = ref([
  {
    id: 1,
    user: 'Alice',
    text: 'Great content!',
    rating: 5,
    date: 'Today'
  }
])

const addComment = (newComment) => {
  newComment.id = comments.value.length + 1
  comments.value.unshift(newComment)
}
</script>