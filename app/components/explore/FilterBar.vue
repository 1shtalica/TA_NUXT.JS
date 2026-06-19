<script setup lang="ts">
import { X, Filter } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

const isFiltering = computed(() => {
  const query = route.query;
  return (
    "category" in query ||
    "location" in query ||
    "province" in query ||
    "price" in query ||
    "sort" in query ||
    "type" in query
  );
});

const handleReset = () => {
  const query = { ...route.query };
  delete query.category;
  delete query.location;
  delete query.province;
  delete query.price;
  delete query.sort;
  delete query.type;
  delete query.page;
  delete query.offset;
  router.push({ query });
};
</script>

<template>
  <section class="sticky top-20 z-40 py-4 pointer-events-none">
    <div class="w-full mx-auto pointer-events-auto">
      <div
        class="relative w-full bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_40px_rgb(0,0,0,0.06)] rounded-3xl lg:rounded-full p-2 lg:p-1.5 transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]"
      >
        <div class="flex flex-col lg:flex-row lg:items-center">
          <div
            class="grid grid-cols-2 lg:flex w-full flex-1 gap-1 lg:gap-0 lg:divide-x divide-slate-100 min-w-0"
          >
            <div class="flex-1 w-full min-w-0 lg:px-1"><CategoryFilter /></div>
            <div class="flex-1 w-full min-w-0 lg:px-1"><LocationFilter /></div>
            <div class="flex-1 w-full min-w-0 lg:px-1"><PriceFilter /></div>
            <div class="flex-1 w-full min-w-0 lg:px-1"><SortByFilter /></div>
          </div>

          <div
            class="flex items-center justify-end mt-2 lg:mt-0 lg:ml-2 shrink-0"
          >
            <Button
              v-if="isFiltering"
              @click="handleReset"
              class="bg-red-50 hover:bg-red-100 text-red-600 border-0 rounded-xl lg:rounded-full h-12 lg:h-14 px-6 gap-2 w-full lg:w-auto shadow-none transition-colors font-semibold"
            >
              <X :size="18" />
              <span>Reset</span>
            </Button>
            <div
              v-else
              class="hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-slate-50 text-slate-400 border border-slate-100 shrink-0"
            >
              <Filter :size="20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
