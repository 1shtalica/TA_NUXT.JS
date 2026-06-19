<script setup lang="ts">
import { ArrowUp } from "lucide-vue-next";
import { useWindowScroll } from "@vueuse/core";
import { computed } from "vue";
import { cn } from "@/lib/utils";

const { y } = useWindowScroll();
const visible = computed(() => y.value > 300);

const handleClick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <button
    id="go-to-top-btn"
    aria-label="Kembali ke atas"
    @click="handleClick"
    :class="
      cn(
        'fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 cursor-pointer transition-all duration-300 ease-in-out hover:bg-primary/90 hover:scale-110 hover:shadow-xl hover:shadow-primary/40 active:scale-95',
        visible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-6 opacity-0 pointer-events-none',
      )
    "
  >
    <ArrowUp :size="18" :stroke-width="2.5" />
  </button>
</template>
