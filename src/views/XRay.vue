<template>
  <span class="text-2xl font-semibold pl-4">X-Ray Diagnosis</span>

  <div
    class="w-full full-height outline-dashed outline-primary mt-6 rounded-2xl bg-primary/10 flex flex-col items-center justify-center text-sm font-semibold"
  >
    <span>Add an X-Rey file</span>
    <span class="mt-1">Allowed Formats: DICOM, PDF, PNG, JPEG</span>
    <button class="btn btn-primary rounded-full mt-4 text-sm">
      <span class="material-symbols-outlined"> add </span>
      Add File
    </button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.full-height {
  height: calc(100vh - 4rem - 160px);
}
</style>
