<script setup>
const emit = defineEmits(['sort'])

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
  <div class="container">
    <form class="form">
      <div class="field">
        <label for="id-select">ID</label>
        <select name="id" @change="handleSort('id', $event)">
          <option value="">По умолчанию</option>
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>
    </form>

    <form class="form">
      <div class="field">
        <label for="title-select">Title</label>
        <select name="title" @change="handleSort('title', $event)">
          <option value="">По умолчанию</option>
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>
    </form>

    <form class="form">
      <div class="field">
        <label for="body-select">Body</label>
        <select name="body" @change="handleSort('body', $event)">
          <option value="">По умолчанию</option>
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;

  gap: 20px;
}
.form {
  padding: 24px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>