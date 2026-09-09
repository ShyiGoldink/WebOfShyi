<script setup lang="ts">
import { ref } from 'vue'
import Blog from '../components/personal_blog/blogs/blog.vue'
import {
  pullGithubBlogs,
  type Blog as BlogData,
} from '../assets/pull_github'

const blogs = ref<BlogData[]>([])
const error = ref('')

pullGithubBlogs()
  .then(result => {
    blogs.value = result
  })
  .catch(e => {
    error.value = e instanceof Error ? e.message : '未知错误'
  })
</script>

<template>
  <main>
    <h1>绘画百日练习</h1>

    <p v-if="error">
      拉取数据失败：{{ error }}
    </p>

    <p v-else-if="blogs.length === 0">
      暂时没有博客数据
    </p>

    <Blog
      v-for="blog in blogs"
      :key="blog.id"
      :blog="blog"
    />
  </main>
</template>