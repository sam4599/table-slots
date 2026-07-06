<script setup>
import { ref } from "vue";

const selectedOption = ref('')
const inputValue = ref('')

const props = defineProps({
  headers: Array
})

const emit = defineEmits(['sendHeader', 'search'])

function handleSelectChange() {
  emit('sendHeader', selectedOption.value)

  // очищаем input при смене поля
  inputValue.value = ''
  emit('search', '')
}
</script>

<template>
  <div class="input-select-component">

    <!-- Select -->
    <div class="control-group">
      <label class="label">Выбери поле</label>
      <select
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

    <!-- Input -->
    <div class="control-group">
      <label class="label">Поиск</label>
      <input
          v-model="inputValue"
          @input="emit('search', inputValue)"
          :disabled="!selectedOption"
          type="text"
          class="styled-input"
          placeholder="Введите значение..."
      />
    </div>

  </div>
</template>

<style scoped>
.input-select-component {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 300px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 14px;
  font-weight: 500;
}

.styled-select,
.styled-input {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.styled-input:disabled {
  background-color: #f5f5f5;
}
</style>