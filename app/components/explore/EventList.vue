<script setup lang="ts">
import { Inbox } from "lucide-vue-next";

const props = defineProps<{
  events: any[];
}>();

</script>

<template>
  <div>
    <div
      v-if="!events || events.length === 0"
      class="flex flex-col items-center justify-center py-20 px-4 text-center border border-border rounded-4xl bg-card shadow-sm max-w-3xl mx-auto my-8"
    >
      <div class="bg-primary/5 p-5 rounded-3xl mb-4 border border-primary/10">
        <Inbox class="w-10 h-10 text-primary" :stroke-width="1.5" />
      </div>
      <h3 class="text-xl md:text-2xl font-bold text-foreground">
        Tidak ada event ditemukan
      </h3>
      <p
        class="text-muted-foreground max-w-sm mt-3 text-sm md:text-base leading-relaxed"
      >
        Coba ganti kata kunci pencarian atau atur ulang filter kamu untuk
        menemukan hasil lainnya.
      </p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
    >
      <EventCard
        v-for="event in events"
        :key="event.id ?? event.event_id ?? event.slug"
        :title="event.title"
        :category="event.type || ''"
        :date="event.start_date || 'TBA'"
        :location="event.is_online ? 'Online' : event.address_title || ''"
        :price="event.ticket_price || 0"
        :originalPrice="event.ticket_price || 0"
        :organizer="event.organizer_name || ''"
        :image="event.image_url || '/placeholder-event.jpg'"
        :slug="event.slug"
        :isOnline="event.is_online"
        :ticketSold="event.total_sold || 0"
        :maxQuota="event.max_capacity || 0"
      />
    </div>
  </div>
</template>
