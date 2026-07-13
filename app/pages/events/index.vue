<script setup lang="ts">
import { INDONESIA_REGIONS } from "~/constants/regions";
import { EventService } from "~/services/event-service";

const { origin } = useRequestURL();

useSeoMeta({
  title: "Cari Event - Kumpulin",
  description: "Temukan berbagai acara seru, konser, workshop, dan seminar di sekitarmu.",
  ogTitle: "Cari Event - Kumpulin",
  ogDescription: "Temukan berbagai acara seru, konser, workshop, dan seminar di sekitarmu.",
  ogUrl: () => `${origin}/events`,
  ogType: "website",
  ogImage: [
    {
      url: `${origin}/og_image.png`,
      width: 1200,
      height: 630,
      alt: "Banner Resmi Kumpul.in",
      type: "image/png",
    },
  ],
});

useHead({
  link: [
    {
      rel: "canonical",
      href: () => `${origin}/events`,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Cari Event - Kumpulin",
        description: "Temukan berbagai acara seru di sekitarmu.",
        url: `${origin}/events`,
      }),
    },
  ],
});

const route = useRoute();

const query = computed(() =>
  typeof route.query.q === "string" ? route.query.q : "",
);
const typeFilter = computed(() =>
  typeof route.query.type === "string" ? route.query.type : "",
);
const categoryFilter = computed(() =>
  typeof route.query.category === "string" ? route.query.category : "",
);
const rawProvinceFilter = computed(() =>
  typeof route.query.province === "string"
    ? route.query.province
    : typeof route.query.location === "string"
      ? route.query.location
      : "",
);
const provinceFilter = computed(() => {
  const val = rawProvinceFilter.value;
  if (!val || val === "online") return "";
  return INDONESIA_REGIONS.find((p) => p.id === val)?.name ?? val;
});
const priceFilter = computed(() =>
  typeof route.query.price === "string" ? route.query.price : "",
);
const sortOption = computed(() =>
  typeof route.query.sort === "string" ? route.query.sort : "",
);

const LIMIT = 12;


const {
  data: initialData,
  pending,
  error: fetchError,
} = useAsyncData(
  "explore-events",
  () =>
    EventService.getEvents($fetch, {
      limit: LIMIT,
      type: typeFilter.value,
      q: query.value,
      category: categoryFilter.value,
      province: provinceFilter.value,
      price: priceFilter.value,
      sort: sortOption.value,
    }),
  {
    watch: [
      query,
      typeFilter,
      categoryFilter,
      provinceFilter,
      priceFilter,
      sortOption,
    ],
  },
);

const initialEvents = computed(() => initialData.value?.data ?? []);
const initialHasMore = computed(
  () => initialData.value?.pagination.has_more ?? false,
);
const initialNextCursor = computed(
  () => initialData.value?.pagination.next_cursor ?? null,
);
const error = computed(() =>
  fetchError.value ? "Gagal memuat event. Silakan coba lagi nanti." : null,
);
</script>

<template>
  <div class="relative min-h-screen flex flex-col overflow-hidden bg-[#f9fafb]">

    <div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <div
        class="absolute inset-0"
        :style="{
          backgroundImage:
            'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.3,
        }"
      />
      <svg
        class="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="85%" cy="18%" r="220" fill="#002cee" fill-opacity="0.032" />
        <circle cx="12%" cy="75%" r="140" fill="#6366f1" fill-opacity="0.028" />
      </svg>
    </div>

    <LandingNavbar />

    <main
      class="relative z-10 container mx-auto w-full max-w-7xl grow px-4 pb-20 md:px-8 lg:px-12"
    >
      <SearchBar />

      <div class="mb-8 relative z-20">
        <FilterBar />
      </div>

      <div
        v-if="error"
        class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
      >
        <p class="text-red-500 text-sm font-medium">{{ error }}</p>
      </div>

      <div v-if="query" class="mb-6 text-slate-500 text-sm md:text-base">
        Hasil pencarian untuk <strong>"{{ query }}"</strong>
      </div>

      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <EventCardSkeleton v-for="i in 12" :key="i" />
      </div>

      <InfiniteEventList
        v-else
        :initial-events="initialEvents"
        :initial-has-more="initialHasMore"
        :initial-next-cursor="initialNextCursor"
        :search-query="query"
        :type-filter="typeFilter"
        :category-filter="categoryFilter"
        :province-filter="provinceFilter"
        :price-filter="priceFilter"
        :sort-option="sortOption"
        :limit="LIMIT"
      />
    </main>

    <GoToTopButton />
  </div>
</template>
