<script setup lang="ts">

defineProps<{ event: any }>();
</script>

<template>
  <div class="pt-16 md:pt-18">
    <ImageSection :event="event" />
    <div
      class="container mx-auto px-4 md:px-8 lg:px-12 w-full max-w-7xl pb-14 md:pb-18 relative z-20"
    >
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-5 lg:gap-6">
        <div class="xl:col-span-8">
          <DetailSection :event="event" />
        </div>
        <div class="xl:col-span-4 relative">
          <div class="sticky top-24">
            <TicketSection :event="event" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
