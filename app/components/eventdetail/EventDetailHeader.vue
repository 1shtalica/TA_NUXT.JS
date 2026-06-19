<script setup lang="ts">
import { cn } from "~/lib/utils";

const isScrolled = ref(false);
const router = useRouter();

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav
    :class="
      cn(
        'fixed top-0 z-50 w-full transition-all duration-300 ease-in-out py-3.5',
        'bg-[#f9fafb]/85 backdrop-blur-xl border-b border-slate-200/70',
        isScrolled ? 'shadow-md shadow-slate-900/5' : 'shadow-xs',
      )
    "
  >
    <div
      class="container mx-auto px-4 md:px-8 lg:px-12 w-full max-w-7xl flex flex-row items-center justify-between"
    >
      <div class="flex items-center gap-4">
        <button
          type="button"
          @click="() => router.go(0)"
          class="flex items-center gap-2 text-xl group cursor-pointer focus-visible:outline-none"
        >
          <span class="text-2xl transition-transform group-hover:rotate-12"
            >🎉</span
          >
          <span
            class="font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary"
          >
            kumpul.in
          </span>
        </button>
      </div>

      <div class="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          class="rounded-xl font-bold h-9 bg-white hover:bg-slate-100 border border-slate-200 shadow-sm"
          as-child
        >
          <NuxtLink to="#">Masuk</NuxtLink>
        </Button>
        <Button
          variant="brand"
          size="sm"
          as-child
          class="hidden md:inline-flex rounded-xl font-bold h-9 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all"
        >
          <NuxtLink to="#">Daftar</NuxtLink>
        </Button>
      </div>
    </div>
  </nav>
</template>
