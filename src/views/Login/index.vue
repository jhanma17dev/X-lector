<template>
  <div class="flex min-h-screen">
    <!-- Left side - Blue section with info -->
    <LoginPanel></LoginPanel>

    <!-- Right side - Login form -->
     <LoginForm></LoginForm>
  </div>
</template>

<script setup lang="ts">
import LoginForm from './LoginForm.vue';
import LoginPanel from './LoginPanel.vue';
</script>