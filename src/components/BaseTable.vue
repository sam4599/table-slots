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

  <SortTable @sort="handleSort" />

  <InputSelect
      :headers="headers"
      @send-header="getSelectHeader"
      @search="setSearch"
  />

  <div v-if="loading" class="loading">
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
.table-wrapper {
  margin-top: 20px;
}

.table {
  border-collapse: collapse;
  width: 100%;
}

.table th,
.table td {
  border: 1px solid #000;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.loading {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}
.table tbody tr:hover {
  background: #f5f5f5;
  cursor: pointer;
}
:deep(mark) {
  background: yellow;
}
</style>