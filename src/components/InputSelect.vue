<script setup>
import { ref } from "vue";

const selectedOption = ref('')
const inputValue = ref('')

defineProps({
  headers: Array
})

const emit = defineEmits(['sendHeader', 'search'])

function handleSelectChange() {
  emit('sendHeader', selectedOption.value)
  inputValue.value = ''
  emit('search', '')
}
</script>

<template>
  <div class="search-panel">
    <span class="search-panel__title">Поиск</span>

    <div class="search-panel__controls">
      <div class="control-group">
        <label class="label" for="search-field">Поле</label>
        <select
            id="search-field"
            v-model="selectedOption"
            class="styled-select"
            @change="handleSelectChange"
        >
          <option value="" disabled>Не выбрано</option>
          <option
              v-for="header in headers"
              :key="header"
              :value="header"
          >
            {{ header }}
          </option>
        </select>
      </div>

      <div class="control-group control-group--search">
        <label class="label" for="search-input">Значение</label>
        <div class="search-input-wrap">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
          </svg>
          <input
              id="search-input"
              v-model="inputValue"
              type="text"
              class="styled-input"
              placeholder="Введите значение..."
              :disabled="!selectedOption"
              @input="emit('search', inputValue)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.search-panel__title {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.search-panel__controls {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

.control-group--search {
  flex: 2;
}

.label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.styled-select,
.styled-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 14px;
  background: var(--color-surface);
  color: var(--color-text);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.styled-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
}

.styled-select:focus,
.styled-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-ring);
}

.search-input-wrap {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.styled-input {
  padding-left: 36px;
}

.styled-input:disabled {
  background: var(--color-bg-muted);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

@media (max-width: 639px) {
  .search-panel__controls {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
