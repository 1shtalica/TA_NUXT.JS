<script setup lang="ts">
import { EventService } from "~/services/event-service";
const route = useRoute();
const slug = computed(() => route.params.slug as string);

const {
  data: event,
  pending,
  error,
} = useAsyncData(
  `event-${slug.value}`,
  () => EventService.getEventBySlug($fetch, slug.value),
  { lazy: true }
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

useSeoMeta({
  title: () => event.value ? `${event.value.title} - Kumpulin` : '404 - Kumpulin',
  description: () => event.value ? `Ikuti acara ${event.value.title} oleh ${event.value.organizer?.name || 'Kumpulin'}.` : 'Event tidak ditemukan',
  ogTitle: () => event.value?.title || '404 - Kumpulin',
  ogDescription: () => event.value ? `Dapatkan Tiket ${event.value.title} sekarang juga di 🎊Kumpulin!` : '',
  ogImage: () => event.value?.images?.find((i: any) => i.is_primary)?.image_url || '',
  ogType: 'website',
});

useHead({
  link: [
    {
      rel: "canonical",
      href: () => `/events/${slug.value}`,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: () => event.value ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        "name": event.value.title,
        "startDate": event.value.event_start_date,
        "location": {
          "@type": "Place",
          "name": event.value.is_online ? "Online" : (event.value.address?.city || "TBA"),
        },
        "organizer": {
          "@type": "Organization",
          "name": event.value.organizer?.name || "Kumpulin"
        }
      }) : '',
    }
  ]
});

</script>

<template>
  <div v-if="pending" class="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb]">
    <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-primary/20 border-r-4 border-primary"></div>
  </div>
  <div v-else-if="event">
    <EventDetailHeader />
    <main class="min-h-screen bg-[#f9fafb]">
      <EventDetailContent :event="event" />
    </main>
  </div>
</template>
