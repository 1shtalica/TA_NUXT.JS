<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { Loader2 } from "@lucide/vue";
import { EventListRequestError, EventService } from "~/services/event-service";

const props = defineProps<{
  initialEvents: any[];
  initialHasMore: boolean;
  initialNextCursor: string | null;
  searchQuery?: string;
  typeFilter?: string;
  categoryFilter?: string;
  provinceFilter?: string;
  priceFilter?: string;
  sortOption?: string;
  limit?: number;
}>();

const events = ref<any[]>([...(props.initialEvents || [])]);
const hasMore = ref(props.initialHasMore);
const nextCursor = ref<string | null>(props.initialNextCursor);
const isLoading = ref(false);
const error = ref<string | null>(null);

const sentinelRef = ref<HTMLElement | null>(null);

watch(
  () => [
    props.searchQuery,
    props.typeFilter,
    props.categoryFilter,
    props.provinceFilter,
    props.priceFilter,
    props.sortOption,
    props.initialEvents,
  ],
  () => {
    events.value = [...(props.initialEvents || [])];
    hasMore.value = props.initialHasMore;
    nextCursor.value = props.initialNextCursor;
    error.value = null;
  },
  { deep: true },
);

const loadMore = async () => {
  if (isLoading.value || !hasMore.value || !nextCursor.value) return;

  isLoading.value = true;
  error.value = null;

  try {
    const result = await EventService.getEventsClient({
      cursor: nextCursor.value,
      limit: props.limit,
      type: props.typeFilter,
      q: props.searchQuery,
      category: props.categoryFilter,
      province: props.provinceFilter,
      price: props.priceFilter,
      sort: props.sortOption,
    });

    events.value = [...events.value, ...result.data];
    hasMore.value = result.pagination.has_more;
    nextCursor.value = result.pagination.next_cursor;
  } catch (err) {
    console.error("Gagal load more:", err);

    if (err instanceof EventListRequestError && err.status === 400) {
      try {
        const result = await EventService.getEventsClient({
          limit: props.limit,
          type: props.typeFilter,
          q: props.searchQuery,
          category: props.categoryFilter,
          province: props.provinceFilter,
          price: props.priceFilter,
          sort: props.sortOption,
        });

        events.value = result.data;
        hasMore.value = result.pagination.has_more;
        nextCursor.value = result.pagination.next_cursor;
        return;
      } catch (resetErr) {
        console.error("Gagal reload halaman pertama:", resetErr);
      }
    }

    error.value = "Gagal memuat event berikutnya. Silakan coba lagi.";
  } finally {
    isLoading.value = false;
  }
};

useIntersectionObserver(
  sentinelRef,
  (entries) => {
    if (entries[0]?.isIntersecting) {
      loadMore();
    }
  },
  {
    rootMargin: "0px 0px 400px 0px",
    threshold: 0,
  },
);
</script>

<template>
  <div>
    <EventList :events="events" />

    <div ref="sentinelRef" class="h-2" aria-hidden="true" />

    <div v-if="isLoading" class="flex justify-center items-center py-10">
      <Loader2 class="animate-spin text-primary h-7 w-7" />
    </div>

    <p v-if="error && !isLoading" class="text-center text-danger text-sm py-6">
      {{ error }}
    </p>

    <p
      v-if="!hasMore && !isLoading && events.length > 0"
      class="text-center text-muted-foreground text-sm py-10"
    >
      Semua event sudah ditampilkan
    </p>
  </div>
</template>
