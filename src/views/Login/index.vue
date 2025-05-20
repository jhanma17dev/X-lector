<template>
  <div class="flex min-h-screen">
    <!-- Left side - Blue section with info -->
    <LoginPanel></LoginPanel>

    <!-- Right side - Login form -->
     <LoginForm></LoginForm>
  </div>
</template>

<script setup>
import LoginForm from './LoginForm.vue';
import LoginPanel from './LoginPanel.vue';
</script>

<style>
body,
html {
  padding: 0 !important;
  overflow: auto;
  scrollbar-width: none !important; /* Firefox */
  -ms-overflow-style: none !important; /* Internet Explorer and Edge */
}

body::-webkit-scrollbar,
html::-webkit-scrollbar {
  display: none !important; /* Safari and Chrome */
}
</style>