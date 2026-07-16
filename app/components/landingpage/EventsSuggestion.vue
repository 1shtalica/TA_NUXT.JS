<script setup lang="ts">
import { ArrowRight, CalendarX, Loader2 } from "@lucide/vue";
import { cn } from "~/lib/utils";
import { EventService } from "~/services/event-service";

const {
  data: events,
  pending,
  error,
} = useAsyncData("events-suggestion", () => EventService.getRandomEvents($fetch));
</script>

<template>
  <section class="relative overflow-hidden py-16 md:py-24 bg-[#f9fafb]">
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
        class="absolute top-8 right-8 h-[22rem] w-[22rem] rounded-full bg-[#002cee14]"
      />
      <div
        class="absolute bottom-8 left-8 h-[18rem] w-[18rem] rounded-full bg-[#6366f112]"
      />
    </div>

    <div
      class="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 w-full max-w-7xl"
    >
      <div class="flex flex-col gap-2 mb-8 md:mb-12">
        <div class="flex items-center justify-between">
          <h2 class="text-xl md:text-3xl font-bold text-accent">
            Event Pilihan
          </h2>
          <Button variant="link" as-child>
            <NuxtLink to="/events?sort=Populer">
              Lihat Semua <ArrowRight :size="18" />
            </NuxtLink>
          </Button>
        </div>
        <p class="text-sm md:text-base text-muted">
          Jangan lewatkan event seru yang akan datang
        </p>
      </div>

      <div v-if="pending" class="flex justify-center items-center py-10">
        <Loader2 class="animate-spin text-primary h-7 w-7" />
      </div>

      <EmptyState
        v-else-if="error || !events || events.length === 0"
        title="Belum Ada Event Pilihan"
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
        <div
          v-for="(event, index) in events.slice(0, 4)"
          :key="event.id"
          :class="
            cn(
              Number(index) > 0 && 'hidden md:block',
              Number(index) === 3 && 'lg:hidden xl:block',
            )
          "
        >
          <EventCard
            :title="event.title"
            :category="event.type"
            :date="event.start_date"
            :location="event.address_title"
            :price="event.ticket_price"
            :organizer="event.organizer_name"
            :image="event.image_url"
            :slug="event.slug"
            :isOnline="event.is_online"
            :ticketSold="event.total_sold"
            :maxQuota="event.max_capacity"
          />
        </div>
      </div>
    </div>
  </section>
</template>
