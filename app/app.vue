<script setup lang="ts">
const Toaster = defineAsyncComponent(() =>
  import("~/components/ui/sonner").then((m) => m.Toaster),
);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  
  <Toaster position="bottom-right" :duration="3000" />
</template>
