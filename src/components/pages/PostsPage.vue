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
  <div>
    <h1>Таблица постов</h1>

    <BaseTable
        :items="posts"
        :loading="loading"
    />
  </div>
</template>