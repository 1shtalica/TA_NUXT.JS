<script setup lang="ts">
import { Search } from "@lucide/vue";
import { useDebounceFn } from "@vueuse/core";

const route = useRoute();
const router = useRouter();

const searchQuery = ref(route.query.q ? String(route.query.q) : "");

const updateQuery = (term: string) => {
  const currentQuery = { ...route.query };

  if (term) {
    currentQuery.q = term;
  } else {
    delete currentQuery.q;
  }

  delete currentQuery.page;
  delete currentQuery.offset;

  router.replace({ query: currentQuery });
};

const debouncedSearch = useDebounceFn((term: string) => {
  updateQuery(term);
}, 500);

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    const target = e.target as HTMLInputElement;
    updateQuery(target.value);
    target.blur();
  }
};

watch(
  () => route.query.q,
  (newQ) => {
    searchQuery.value = newQ ? String(newQ) : "";
  },
);
</script>

<template>
  <section class="w-full pt-28 md:pt-36 pb-4 relative z-10">
    <div class="w-full max-w-3xl mx-auto space-y-4 md:space-y-5 text-center">
      <h1
        class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
      >
        Eksplorasi
        <span class="text-primary relative inline-block">
          Event Seru
          <svg
            class="absolute -bottom-1.5 left-0 w-full h-2 text-primary/20 -z-10"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <path
              d="M0 15 Q 50 0 100 15 L 100 20 L 0 20 Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </h1>
      <p
        class="text-slate-500 text-sm md:text-base max-w-xl mx-auto font-medium"
      >
        Temukan dan ikuti berbagai acara menarik di sekitarmu, mulai dari
        konser, workshop, hingga seminar.
      </p>

      <div class="relative mt-6 md:mt-8 group w-full">
        <div
          class="relative flex items-center w-full bg-white backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[1.5rem] sm:rounded-full p-1.5 lg:p-2 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
        >
          <div
            class="pl-3 sm:pl-4 pr-1 sm:pr-2 flex items-center justify-center shrink-0"
          >
            <Search
              class="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 group-focus-within:text-primary transition-colors duration-300"
            />
          </div>

          <Input
            type="text"
            placeholder="Cari konser, workshop, atau seminar..."
            class="w-full h-10 lg:h-12 bg-transparent border-0 shadow-none text-sm md:text-base text-slate-900 placeholder:text-slate-400 font-medium focus-visible:ring-0 focus-visible:ring-offset-0 px-2 pr-4 rounded-none"
            v-model="searchQuery"
            @input="debouncedSearch(($event.target as HTMLInputElement).value)"
            @keydown="handleKeyDown"
          />
        </div>

        <div
          class="absolute -z-10 inset-0 -mx-4 -my-4 bg-primary/20 rounded-full blur-[40px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none"
        />
      </div>
    </div>
  </section>
</template>
