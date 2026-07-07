<script setup>
import { onMounted, ref } from 'vue'

import BaseTable from "@/components/BaseTable.vue";

const posts = ref([])
const loading = ref(true)

async function loadPosts() {
  try {
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
    )

    posts.value = await response.json()

  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(loadPosts)
</script>

<template>
  <div class="page">
    <h1 class="page-title">Таблица постов</h1>

    <BaseTable
        :items="posts"
        :loading="loading"
    />
  </div>
</template>

<style scoped>
.page-title {
  margin: 0 0 20px;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
}

@media (max-width: 480px) {
  .page-title {
    font-size: 20px;
  }
}
</style>