<script setup lang="ts">
import Avatar from '../components/personal_blog/introduction/avatar.vue'
import { siteInfo } from '../data/siteInfo'

// 「绘画百日练习」板块已暂停展示，相关代码仍保留在仓库中：
// src/components/personal_blog/blogs/blog.vue、src/assets/pull_github.ts、
// src/data/personalBlog.ts、scripts/sync-github.mjs。
// 需要恢复时把博客列表重新接回这个页面即可。
</script>

<template>
  <main class="home">
    <section class="intro">
      <Avatar />
      <h1>{{ siteInfo.name }}</h1>
      <p class="owner">
        {{ siteInfo.owner }}
      </p>
      <p class="tagline">
        {{ siteInfo.tagline }}
      </p>
    </section>

    <footer class="footer">
      <p v-if="siteInfo.icp" class="record">
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >{{ siteInfo.icp }}</a>
      </p>
      <p v-if="siteInfo.police" class="record">
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch"
          target="_blank"
          rel="noopener noreferrer"
        >{{ siteInfo.police }}</a>
      </p>
    </footer>
  </main>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding: 3rem 0;
  text-align: center;
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

h1 {
  font-size: 2rem;
  color: var(--color-heading);
}

.tagline {
  color: var(--color-text);
  opacity: 0.8;
}

.owner {
  font-size: 1.25rem;
  color: var(--color-heading);
  letter-spacing: 0.05em;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--color-text);
  opacity: 0.75;
}

.footer a {
  color: inherit;
}

@media (max-width: 600px) {
  .home {
    gap: 3rem;
    padding: 2rem 0;
  }
}
</style>
