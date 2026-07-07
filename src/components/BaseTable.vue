<script setup>
import { computed, ref } from 'vue'

import PaginationTable from "@/components/PaginationTable.vue";
import SortTable from "@/components/SortTable.vue";
import TableRow from "@/components/TableRow.vue";
import InputSelect from "@/components/InputSelect.vue";
import ModalWindow from "@/components/ModalWindow.vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },

  loading: {
    type: Boolean,
    default: false
  }
})

const visiblePosts = ref([])

const sortConfig = ref({
  field: null,
  direction: null
})

function handleSort(config) {
  sortConfig.value = config
}

const sortedPosts = computed(() => {
  const { field, direction } = sortConfig.value

  if (!field || !direction) {
    return props.items
  }

  return [...props.items].sort((a, b) => {
    const modifier = direction === 'asc' ? 1 : -1

    return a[field] > b[field]
        ? modifier
        : -modifier
  })
})

function getPaginatedPosts(posts) {
  visiblePosts.value = posts
}

const headers = computed(() => {
  if (!visiblePosts.value.length) return []

  return Object.keys(visiblePosts.value[0])
})

const selectedHeader = ref('')
const search = ref('')
const selectedItem = ref(null)
const modalOpen = ref(false)

function openModal(row) {
  selectedItem.value = row
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

function getSelectHeader(payload) {
  selectedHeader.value = payload
}

function setSearch(value) {
  search.value = value
}

const filteredPosts = computed(() => {
  if (!search.value || !selectedHeader.value) {
    return visiblePosts.value
  }

  const query = search.value.toLowerCase()

  return visiblePosts.value.filter(post => {
    return String(post[selectedHeader.value])
        .toLowerCase()
        .includes(query)
  })
})

function highlight(text, key) {
  if (!search.value || key !== selectedHeader.value) {
    return text
  }

  return String(text).replace(
      new RegExp(search.value, 'gi'),
      '<mark>$&</mark>'
  )
}

</script>

<template>

  <div class="table-toolbar">
    <InputSelect
        :headers="headers"
        @send-header="getSelectHeader"
        @search="setSearch"
    />

    <div class="toolbar-divider" aria-hidden="true" />

    <SortTable @sort="handleSort" />
  </div>

  <div v-if="loading" class="loading">
    <span class="loading-spinner" />
    Загрузка...
  </div>

  <div v-else class="table-wrapper">

    <table class="table">

      <thead>
      <tr>
        <th
            v-for="header in headers"
            :key="header"
        >
          {{ header }}
        </th>
      </tr>
      </thead>

      <tbody>

      <TableRow
          v-for="row in filteredPosts"
          :key="row.id"
          @click="openModal(row)"
      >
        <td
            v-for="key in headers"
            :key="key"
            :data-label="key"
            v-html="highlight(row[key], key)"
        ></td>
      </TableRow>

      </tbody>

    </table>

  </div>
  <ModalWindow
      v-if="modalOpen"
      :item="selectedItem"
      @close="closeModal"
  />
  <PaginationTable
      :local-posts="sortedPosts"
      @send-posts="getPaginatedPosts"
  />

</template>

<style scoped>
.table-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
  padding: 20px;
  margin-bottom: 20px;
  background: var(--color-bg-muted);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.toolbar-divider {
  width: 1px;
  align-self: stretch;
  background: var(--color-border-light);
  flex-shrink: 0;
}

.table-wrapper {
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}

.table th,
.table td {
  border-bottom: 1px solid var(--color-border-light);
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.table th {
  background: var(--color-bg-muted);
  font-weight: 600;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.loading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding: 24px;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: var(--color-bg-muted);
  border-radius: var(--radius-lg);
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.table tbody tr:hover {
  background: var(--color-bg-hover);
  cursor: pointer;
}

:deep(mark) {
  background: #fef08a;
  color: inherit;
  border-radius: 2px;
  padding: 0 2px;
}

@media (max-width: 768px) {
  .table-toolbar {
    flex-direction: column;
    padding: 16px;
    gap: 16px;
  }

  .toolbar-divider {
    width: 100%;
    height: 1px;
  }

  .table-wrapper {
    border: none;
    box-shadow: none;
    background: transparent;
  }

  .table {
    display: block;
    table-layout: auto;
  }

  .table thead {
    display: none;
  }

  .table tbody {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .table tbody :deep(tr) {
    display: block;
    background: var(--color-surface);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  }

  .table tbody :deep(tr:hover) {
    background: var(--color-bg-hover);
  }

  .table td {
    display: grid;
    grid-template-columns: 1fr;
    gap: 4px;
    padding: 10px 14px;
    font-size: 13px;
    border-bottom: 1px solid var(--color-border-light);
  }

  .table td::before {
    content: attr(data-label);
    font-weight: 600;
    font-size: 11px;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .table td:last-child {
    border-bottom: none;
  }
}
</style>