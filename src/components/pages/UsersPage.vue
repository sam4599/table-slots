<script setup>
import { onMounted, ref } from 'vue'

import BaseTable from "@/components/BaseTable.vue";

const users = ref([])
const loading = ref(true)

async function loadUsers() {
  try {
    const response = await fetch(
        'https://a1a8cc66f3f7f7a9.mokky.dev/users'
    )

    users.value = await response.json()

  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(loadUsers)
</script>

<template>
  <div>
    <h1>Таблица пользователей</h1>

    <BaseTable
        :items="users"
        :loading="loading"
    />
  </div>
</template>