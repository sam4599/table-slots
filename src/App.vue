<script setup>
</script>

<template>
  <div class="container">

    <nav class="nav">
      <RouterLink to="/posts">Посты</RouterLink>
      <RouterLink to="/users">Пользователи</RouterLink>
    </nav>

    <RouterView />

  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}

.nav {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.nav a {
  text-decoration: none;
  color: black;
  font-size: 18px;
  transition: 0.2s;
}

.router-link-active {
  font-weight: bold;
  color: blue;
  border-bottom: 2px solid blue;
  padding-bottom: 4px;
}
</style>