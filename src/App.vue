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

<style>
:root {
  --color-text: #1e293b;
  --color-text-secondary: #475569;
  --color-text-muted: #64748b;
  --color-surface: #ffffff;
  --color-bg-muted: #f8fafc;
  --color-bg-hover: #f1f5f9;
  --color-border: #cbd5e1;
  --color-border-light: #e2e8f0;
  --color-accent: #3b82f6;
  --color-accent-ring: rgba(59, 130, 246, 0.15);
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--color-text);
  background: #f1f5f9;
  -webkit-font-smoothing: antialiased;
}
</style>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.nav {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  padding: 6px;
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.nav a {
  flex: 1;
  text-align: center;
  text-decoration: none;
  color: var(--color-text-secondary);
  font-size: 15px;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  transition: background 0.2s, color 0.2s;
}

.nav a:hover {
  background: var(--color-bg-hover);
  color: var(--color-text);
}

.router-link-active {
  background: var(--color-accent) !important;
  color: #fff !important;
  font-weight: 600;
}

@media (max-width: 480px) {
  .container {
    padding: 12px;
  }

  .nav {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
