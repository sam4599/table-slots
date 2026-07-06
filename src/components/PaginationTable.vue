<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  localPosts: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['sendPosts'])

const currentPage = ref(1)
const perPage = 10

const pages = computed(() =>
    Math.ceil(props.localPosts.length / perPage) || 1
)

const visiblePageNumbers = computed(() => {
  if (pages.value <= 3) {
    return Array.from({ length: pages.value }, (_, i) => i + 1)
  }

  const start = Math.min(
      Math.max(currentPage.value - 1, 1),
      pages.value - 2
  )

  return [start, start + 1, start + 2]
})

const visiblePosts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return props.localPosts.slice(start, start + perPage)
})

const goToPage = (page) => {
  if (page >= 1 && page <= pages.value) {
    currentPage.value = page
  }
}

watch(visiblePosts, val => emit('sendPosts', val), { immediate: true })

watch(() => props.localPosts.length, () => {
  if (currentPage.value > pages.value) currentPage.value = 1
})
</script>

<template>
  <div class="pagination">
    <button
        class="pagination-button"
        :disabled="currentPage <= 1"
        @click="goToPage(1)"
        title="Первая страница"
    >
      «
    </button>
    <button
        class="pagination-button"
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
        title="Предыдущая"
    >
      ‹
    </button>

    <button
        v-for="page in visiblePageNumbers"
        :key="page"
        :class="['pagination-button', { active: currentPage === page }]"
        @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <button
        class="pagination-button"
        :disabled="currentPage >= pages"
        @click="goToPage(currentPage + 1)"
        title="Следующая"
    >
      ›
    </button>
    <button
        class="pagination-button"
        :disabled="currentPage >= pages"
        @click="goToPage(pages)"
        title="Последняя страница"
    >
      »
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-top: auto;
  padding: 16px 0 20px;
}

.pagination-button {
  min-width: 36px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  border-radius: 4px;
}

.pagination-button:hover:not(:disabled) {
  background: #f0f0f0;
}

.pagination-button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.pagination-button.active:hover {
  background: #3395ff;
  border-color: #3395ff;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>