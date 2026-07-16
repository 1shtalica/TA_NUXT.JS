<script setup lang="ts">
import { ImageOff } from "@lucide/vue";
import Autoplay from "embla-carousel-autoplay";

const props = defineProps<{ event: any }>();

const isVisible = ref(true);
const blurOpacity = ref(1);
const sectionRef = ref<HTMLElement | null>(null);
const failedIndexes = reactive<Set<number>>(new Set());

const images = computed(() => {
  const allImages = props.event.images ?? [];
  const primaryImage =
    allImages.find((img: any) => img.is_primary)?.image_url ??
    allImages[0]?.image_url;
  const otherImages = allImages
    .filter((img: any) => !img.is_primary)
    .map((img: any) => img.image_url);

  return primaryImage
    ? [primaryImage, ...otherImages]
    : [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070",
      ];
});

const handleScroll = () => {
  if (!sectionRef.value) return;

  const rect = sectionRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < 0) {
    const scrolledPast = Math.abs(rect.top);
    const fadeDistance = windowHeight * 0.8;
    const opacity = Math.max(0, 1 - scrolledPast / fadeDistance);
    blurOpacity.value = opacity;
    isVisible.value = opacity > 0;
  } else {
    blurOpacity.value = 1;
    isVisible.value = true;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div ref="sectionRef" class="relative w-full">
    <div
      v-show="isVisible"
      class="fixed top-0 left-0 w-screen pointer-events-none transition-opacity duration-300 ease-out"
      :style="{ opacity: blurOpacity, height: '200vh', zIndex: 1 }"
    >
      <div class="absolute inset-0 bg-[#f9fafb]" />
      <div
        class="absolute inset-0"
        style="
          background-image: radial-gradient(
            circle,
            #94a3b8 1px,
            transparent 1px
          );
          background-size: 28px 28px;
          opacity: 0.18;
        "
      />
      <svg
        class="absolute inset-0 h-full w-full text-primary"
        viewBox="0 0 1440 720"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M80 476C238 348 346 548 510 400C650 274 754 346 910 242C1078 130 1200 254 1370 134"
          stroke="currentColor"
          stroke-opacity="0.08"
          stroke-width="2"
        />
        <path
          d="M128 170C292 238 398 92 564 164C714 230 820 142 972 206C1118 268 1212 372 1360 310"
          stroke="#10b981"
          stroke-opacity="0.06"
          stroke-width="2"
        />
      </svg>
      <div
        class="absolute inset-0 bg-linear-to-b from-[#f9fafb]/30 via-transparent to-[#f9fafb]"
      />
    </div>

    <div class="relative z-10 py-5 md:py-7">
      <div class="container mx-auto px-4 md:px-8 lg:px-12 w-full max-w-7xl">
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div class="xl:col-span-12">
            <Carousel
              class="w-full overflow-hidden rounded-2xl border border-white/70 bg-white shadow-lg shadow-slate-900/10"
              :plugins="[Autoplay({ delay: 4000 })]"
              :opts="{ loop: true }"
            >
              <CarouselContent>
                <CarouselItem v-for="(src, index) in images" :key="index">
                  <div
                    class="relative w-full h-54 sm:h-76 md:h-96 lg:h-108 xl:h-120 max-h-120"
                  >
                    <div
                      v-if="failedIndexes.has(index)"
                      class="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400"
                    >
                      <ImageOff :size="32" class="mb-2 opacity-50" />
                      <span class="text-xs font-medium">Image not available</span>
                    </div>
                    <img
                      v-else
                      :src="src"
                      :alt="`${event.title} - Poster ${index + 1}`"
                      class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      @error="failedIndexes.add(index)"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <template v-if="images.length > 1">
                <CarouselPrevious
                  class="left-4 bg-white/85 hover:bg-white text-slate-900 border-0 shadow-md backdrop-blur-md"
                />
                <CarouselNext
                  class="right-4 bg-white/85 hover:bg-white text-slate-900 border-0 shadow-md backdrop-blur-md"
                />
              </template>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
