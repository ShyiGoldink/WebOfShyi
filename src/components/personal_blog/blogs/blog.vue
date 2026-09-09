<script setup lang="ts">
import type { Blog } from '../../../assets/pull_github'

defineProps<{
  blog: Blog
}>()
</script>

<template>
  <article class="blog">
    <time>
      {{ blog.date }} {{ blog.time }}
    </time>

    <p>
      {{ blog.texts }}
    </p>

    <div class="images">
      <img
        v-for="image in blog.imgsaddr"
        :key="image"
        :src="image"
        alt=""
      />
    </div>
  </article>
</template>

<style scoped>
.blog {
  margin-bottom: 40px;
}

.images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.images img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>