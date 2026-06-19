<script setup lang="ts">
import { EventService } from "~/services/event-service";
import { Loader2 } from "lucide-vue-next";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

// Fetch event berdasarkan slug secara lazy agar tidak memblokir navigasi
const {
  data: event,
  pending,
  error,
} = useAsyncData(
  `event-${slug.value}`,
  () => EventService.getEventBySlug($fetch, slug.value),
  { lazy: true },
);

watch([event, pending, error], ([newEvent, newPending, newError]) => {
  if (!newPending && (!newEvent || newError)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Event tidak ditemukan",
      fatal: true,
    });
  }
});

useHead({
  title: "Event Detail - Kumpulin",
  meta: [{ name: "description", content: "Detail event di Kumpulin." }],
});
</script>

<template>
  <div
    v-if="pending"
    class="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb]"
  >
    <Loader2 class="animate-spin text-primary h-10 w-10 mb-4" />
    <p class="text-slate-500 font-medium">Memuat detail event...</p>
  </div>
  <div v-else-if="event">
    <EventDetailHeader />
    <main class="min-h-screen bg-[#f9fafb]">
      <EventDetailContent :event="event" />
    </main>
  </div>
</template>
