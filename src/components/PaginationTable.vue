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
  flex-wrap: wrap;
  gap: 6px;
  padding: 12px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.pagination-button {
  min-width: 36px;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  cursor: pointer;
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--color-text);
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.pagination-button:hover:not(:disabled) {
  background: var(--color-bg-hover);
}

.pagination-button.active {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
}

.pagination-button.active:hover {
  background: #2563eb;
  border-color: #2563eb;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>