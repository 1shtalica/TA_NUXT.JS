<script setup lang="ts">
import { EventService } from "~/services/event-service";
const route = useRoute();
const slug = computed(() => route.params.slug as string);
const { origin } = useRequestURL();

const {
  data: event,
  pending,
  error,
} = await useAsyncData(
  `event-${slug.value}`,
  () => EventService.getEventBySlug($fetch, slug.value)
);

if (!event.value || error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Event tidak ditemukan",
    fatal: true,
  });
}

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
  description: () => event.value ? `Ikuti acara ${event.value.title} sekarang juga di Kumpulin.` : 'Event tidak ditemukan',
  ogTitle: () => event.value?.title || '404 - Kumpulin',
  ogDescription: () => event.value ? `Dapatkan Tiket ${event.value.title} sekarang juga di 🎊Kumpulin!` : '',
  ogUrl: () => event.value ? `${origin}/events/${slug.value}` : `${origin}/`,
  ogType: 'website',
  ogImage: () => {
    const imageUrl = event.value?.images?.find((i: any) => i.is_primary)?.image_url
      || event.value?.images?.[0]?.image_url
      || `${origin}/og_image.png`;
    return [{ url: imageUrl, width: 1200, height: 630, alt: event.value?.title || 'Kumpulin', type: 'image/png' }];
  },
});

useHead(() => ({
  link: [
    {
      rel: "canonical",
      href: event.value ? `${origin}/events/${slug.value}` : `${origin}/`,
    },
  ],
  script: event.value ? [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
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
      }),
    }
  ] : [],
}));

</script>

<template>
  <div v-if="pending" class="min-h-screen bg-[#f9fafb]">
    <EventDetailSkeleton />
  </div>
  <div v-else-if="event">
    <EventDetailHeader />
    <main class="min-h-screen bg-[#f9fafb]">
      <EventDetailContent :event="event" />
    </main>
  </div>
</template>
