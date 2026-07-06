<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}
</script>

<template>

  <div class="overlay" @click="closeModal">

    <div class="modal" @click.stop>

      <button
          class="close-button"
          @click="closeModal"
      >
        ×
      </button>

      <h2 class="title">
        Информация
      </h2>

      <div
          v-for="(value, key) in item"
          :key="key"
          class="field"
      >
        <strong>{{ key }}:</strong>
        {{ value }}
      </div>

    </div>

  </div>

</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
}

.modal {
  position: relative;

  width: 500px;
  max-width: 90%;

  background: white;
  border-radius: 12px;

  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 12px;
}

.close-button {
  position: absolute;

  top: 10px;
  right: 10px;

  border: none;
  background: none;

  font-size: 24px;
  cursor: pointer;
}

.title {
  margin: 0 0 12px;
}

.field {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
</style>