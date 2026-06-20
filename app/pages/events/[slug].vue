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

</script>

<template>
  <div v-if="event">
    <EventDetailHeader />
    <main class="min-h-screen bg-[#f9fafb]">
      <EventDetailContent :event="event" />
    </main>
  </div>
</template>
