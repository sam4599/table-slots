<script setup>
const emit = defineEmits(['sort'])

const sortFields = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'body', label: 'Body' },
]

function handleSort(field, event) {
  const direction = event.target.value

  if (!direction) {
    emit('sort', { field: null, direction: null })
  } else {
    emit('sort', { field, direction })
  }
}
</script>

<template>
  <div class="sort-panel">
    <span class="sort-panel__title">Сортировка</span>

    <div class="sort-panel__fields">
      <div
          v-for="field in sortFields"
          :key="field.key"
          class="field"
      >
        <label :for="`${field.key}-select`">{{ field.label }}</label>
        <select
            :id="`${field.key}-select`"
            :name="field.key"
            class="styled-select"
            @change="handleSort(field.key, $event)"
        >
          <option value="">По умолчанию</option>
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sort-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.sort-panel__title {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.sort-panel__fields {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 120px;
}

.field label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.styled-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 14px;
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
}

.styled-select:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-ring);
}

@media (max-width: 639px) {
  .sort-panel__fields {
    flex-direction: column;
  }

  .field {
    min-width: unset;
  }
}
</style>
