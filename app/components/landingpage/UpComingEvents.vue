<script setup lang="ts">
import { ArrowRight, CalendarX } from "@lucide/vue";
import { EventService } from "~/services/event-service";

const {
  data: events,
  pending,
  error,
} = await useAsyncData("upcoming-events", () =>
  EventService.getEvents($fetch, { limit: 8 }),
);
</script>

<template>
  <section class="relative overflow-hidden py-12 md:py-16 bg-[#f9fafb]">
    <div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <div
        class="absolute inset-0"
        style="
          background-image: radial-gradient(
            circle,
            #94a3b8 1px,
            transparent 1px
          );
          background-size: 28px 28px;
          opacity: 0.24;
        "
      />
      <div
        class="absolute top-8 right-8 h-[21rem] w-[21rem] rounded-full bg-[#002cee14]"
      />
      <div
        class="absolute bottom-8 left-8 h-[16rem] w-[16rem] rounded-full bg-[#6366f112]"
      />
    </div>

    <div
      class="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 w-full max-w-7xl"
    >
      <div class="flex flex-col gap-3 mb-8">
        <div class="flex items-center justify-between">
          <h2 class="text-xl md:text-3xl font-bold text-accent">
            Event Segera Hadir
          </h2>
          <Button variant="link" as-child class="px-0 md:px-4">
            <NuxtLink to="/events?sort=newest" class="flex items-center gap-1">
              Lihat Semua <ArrowRight :size="18" />
            </NuxtLink>
          </Button>
        </div>
        <p class="text-muted">Jangan lewatkan event seru yang akan datang</p>
      </div>

      <div
        v-if="pending"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
      >
        <EventCardSkeleton v-for="i in 8" :key="i" />
      </div>

      <EmptyState
        v-else-if="error || !events?.data || events.data.length === 0"
        title="Belum Ada Event"
        description="Saat ini belum ada event yang tersedia"
      >
        <template #icon
          ><CalendarX
            class="h-10 w-10 text-primary drop-shadow-sm"
            :stroke-width="1.5"
        /></template>
      </EmptyState>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
      >
        <EventCard
          v-for="(event, index) in events.data"
          :key="event.id"
          :title="event.title"
          :category="event.type || ''"
          :date="event.start_date || ''"
          :location="event.is_online ? 'Online' : event.address_title || ''"
          :price="event.ticket_price || 0"
          :originalPrice="event.ticket_price || 0"
          :organizer="event.organizer_name || ''"
          :image="event.image_url || '/placeholder-event.jpg'"
          :slug="event.slug"
          :isHot="false"
          :isOnline="event.is_online"
          :isRtPintar="event.type === 'internal'"
          :ticketSold="event.total_sold || 0"
          :maxQuota="event.max_capacity || 0"
          :priority="index === 0"
        />
      </div>
    </div>
  </section>
</template>
