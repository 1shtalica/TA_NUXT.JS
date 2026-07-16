<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import {
  Search,
  Clapperboard,
  Laptop,
  Trophy,
  Palette,
  Briefcase,
  Pizza,
  ArrowUpRight,
  MapPin,
  Ticket,
  Users,
  CalendarDays,
  Star,
  ChevronRight,
} from "@lucide/vue";

const router = useRouter();
const searchValue = ref("");
const heroEvents = ref<any[]>([]);
const CYCLING_WORDS = ["Konser", "Workshop", "Festival", "Seminar", "Pameran"];
const CARD_ACCENTS = ["#6366f1", "#10b981", "#f59e0b"];
const wordIndex = ref(0);
const wordVisible = ref(true);

let wordInterval: ReturnType<typeof setInterval>;

onMounted(async () => {
  wordInterval = setInterval(() => {
    wordVisible.value = false;
    setTimeout(() => {
      wordIndex.value = (wordIndex.value + 1) % CYCLING_WORDS.length;
      wordVisible.value = true;
    }, 350);
  }, 2400);

  try {
    const res = await $fetch<any>("/api/proxy/events?limit=3");
    heroEvents.value = res.data ?? [];
  } catch (error) {
    console.error(error);
  }
});

onUnmounted(() => {
  clearInterval(wordInterval);
});

const debouncedSearch = useDebounceFn((term: string) => {
  if (term.trim()) router.push(`/events?q=${encodeURIComponent(term.trim())}`);
}, 500);

const handleSearch = (value: string) => {
  searchValue.value = value;
  debouncedSearch(value);
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    const value = (e.target as HTMLInputElement).value.trim();
    if (value) router.push(`/events?q=${encodeURIComponent(value)}`);
  }
};

const executeSearch = () => {
  if (searchValue.value.trim()) {
    router.push(`/events?q=${encodeURIComponent(searchValue.value.trim())}`);
  }
};

const formatEventDate = (dateStr: string) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
};

const getEventTag = (ev: any) => {
  const fillRatio = ev.max_capacity > 0 ? ev.total_sold / ev.max_capacity : 0;
  if (ev.ticket_price === 0)
    return { text: "Gratis", className: "bg-emerald-50 text-emerald-700" };
  if (fillRatio >= 0.8)
    return { text: "Hampir penuh", className: "bg-rose-50 text-rose-600" };
  return { text: "Tersedia", className: "bg-sky-50 text-sky-700" };
};

const CATEGORIES = [
  {
    name: "Hiburan",
    icon: Clapperboard,
    href: `/events?category=Hiburan`,
    color: "#6366f1",
  },
  {
    name: "Teknologi",
    icon: Laptop,
    href: `/events?category=Teknologi`,
    color: "#10b981",
  },
  {
    name: "Olahraga",
    icon: Trophy,
    href: `/events?category=Olahraga`,
    color: "#f59e0b",
  },
  {
    name: "Workshop",
    icon: Palette,
    href: `/events?category=Workshop`,
    color: "#ec4899",
  },
  {
    name: "Bisnis",
    icon: Briefcase,
    href: `/events?category=Bisnis`,
    color: "#3b82f6",
  },
  {
    name: "Kuliner",
    icon: Pizza,
    href: `/events?category=Kuliner`,
    color: "#ef4444",
  },
];

const STATS = [
  { v: "1,200+", l: "Event", icon: CalendarDays },
  { v: "50K+", l: "Peserta", icon: Users },
  { v: "34", l: "Kota", icon: MapPin },
  { v: "98%", l: "Puas", icon: Star },
];

const activeIdx = ref(0);
let stackInterval: ReturnType<typeof setInterval>;
onMounted(() => {
  if (heroEvents.value.length > 0) {
    stackInterval = setInterval(() => {
      activeIdx.value = (activeIdx.value + 1) % heroEvents.value.length;
    }, 3200);
  }
});
onUnmounted(() => {
  clearInterval(stackInterval);
});
</script>

<template>
  <section class="relative w-full overflow-hidden bg-[#f9fafb] pt-4">
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div
        class="absolute inset-0"
        style="
          background-image: radial-gradient(
            circle,
            #94a3b8 1px,
            transparent 1px
          );
          background-size: 28px 28px;
          opacity: 0.3;
        "
      />
      <svg
        class="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="85%" cy="18%" r="220" fill="#002cee" fill-opacity="0.032" />
        <circle cx="12%" cy="75%" r="140" fill="#6366f1" fill-opacity="0.028" />
      </svg>
    </div>

    <div
      class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20"
    >
      <div
        class="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16"
      >
        <div class="flex-1 flex flex-col gap-5 lg:gap-7 w-full lg:max-w-[58%]">
          <div class="inline-flex items-center gap-2 self-start">
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              />
              <span
                class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
              />
            </span>
            <span
              class="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-[0.12em]"
              >1.200+ Event Aktif Indonesia</span
            >
          </div>

          <h1
            class="text-[2rem] sm:text-[2.6rem] md:text-[3.4rem] lg:text-[3.8rem] font-extrabold text-slate-900 leading-[1.1] tracking-[-0.02em]"
          >
            Satu tempat<br />semua
            <span class="relative z-10">
              <span
                class="relative inline-block min-w-[150px] sm:min-w-[200px] md:min-w-[260px] lg:min-w-[290px] text-left"
                :style="{
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                  opacity: wordVisible ? 1 : 0,
                  transform: wordVisible
                    ? 'translateY(0)'
                    : 'translateY(-10px)',
                }"
              >
                <span
                  class="absolute inset-x-0 bottom-0 h-[45%] rounded-sm"
                  style="background: #002cee20; z-index: -1"
                />
                <span class="text-primary font-black">{{
                  CYCLING_WORDS[wordIndex]
                }}</span>
              </span> </span
            ><br /><span class="text-slate-300">di Indonesia.</span>
          </h1>

          <p
            class="text-sm sm:text-base lg:text-lg text-slate-500 leading-relaxed max-w-lg font-medium"
          >
            Dari konser jazz malam hari hingga hackathon teknologi — temukan,
            ikuti, dan beli tiket dalam satu klik.
          </p>

          <div class="flex flex-col gap-2.5 w-full max-w-lg">
            <div
              class="flex items-center h-12 sm:h-13 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all duration-200"
            >
              <div
                class="flex items-center justify-center px-3 sm:px-4 h-full text-slate-400 shrink-0"
              >
                <Search :size="17" />
              </div>
              <Input
                type="text"
                placeholder="Cari event, konser, workshop..."
                class="flex-1 h-full border-0 bg-transparent shadow-none focus-visible:ring-0 text-sm text-slate-800 placeholder:text-slate-400 px-0 min-w-0"
                v-model="searchValue"
                @input="handleSearch(($event.target as HTMLInputElement).value)"
                @keydown="handleKeyDown"
              />
              <Button
                @click="executeSearch"
                class="shrink-0 h-full rounded-none rounded-r-xl px-4 sm:px-5 bg-primary hover:bg-primary/90 text-white text-sm font-bold border-l border-primary/20 shadow-none"
              >
                Cari
              </Button>
            </div>

            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-xs text-slate-400">Coba:</span>
              <button
                v-for="(t, i) in ['Jazz', 'Startup', 'Workshop UI', 'Marathon']"
                :key="t"
                type="button"
                @click="
                  () => {
                    searchValue = t;
                    router.push(`/events?q=${encodeURIComponent(t)}`);
                  }
                "
                :class="`text-xs text-slate-600 px-2.5 py-1 rounded-xl bg-white border border-slate-200 hover:border-primary hover:text-primary transition-all duration-150 cursor-pointer ${i === 3 ? 'hidden sm:inline-flex' : ''}`"
              >
                {{ t }}
              </button>
            </div>
          </div>

          <div
            class="grid grid-cols-2 sm:flex sm:flex-row sm:items-center gap-3 sm:gap-5"
          >
            <div
              v-for="{ v, l, icon } in STATS"
              :key="l"
              class="flex items-center gap-2"
            >
              <div
                class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-slate-600 shrink-0"
              >
                <component :is="icon" :size="15" />
              </div>
              <div>
                <p class="font-extrabold text-sm text-slate-900 leading-none">
                  {{ v }}
                </p>
                <p class="text-[12px] text-slate-400 font-medium">{{ l }}</p>
              </div>
            </div>
          </div>

          <div>
            <p
              class="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5"
            >
              Jelajah kategori
            </p>
            <div class="relative">
              <div class="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                <NuxtLink
                  v-for="{ name, icon, href, color } in CATEGORIES"
                  :key="name"
                  :to="href"
                  class="group shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-white border border-slate-200 hover:border-transparent hover:shadow-md transition-all duration-200"
                  :style="{ '--cat-color': color }"
                >
                  <component
                    :is="icon"
                    :size="14"
                    class="transition-colors duration-200"
                    style="color: var(--cat-color)"
                  />
                  <span
                    class="text-xs font-semibold text-slate-700 group-hover:text-slate-900 whitespace-nowrap"
                    >{{ name }}</span
                  >
                </NuxtLink>
              </div>
              <div
                class="absolute right-0 top-0 h-full w-10 bg-linear-to-l from-[#f9fafb] to-transparent pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div
          class="hidden lg:flex flex-col items-center flex-1 max-w-[38%] gap-6"
        >
          <div class="self-start flex items-center gap-2">
            <Ticket :size="14" class="text-primary" />
            <span
              class="text-xs font-bold text-slate-500 uppercase tracking-widest"
              >Event Berlangsung</span
            >
          </div>
          <div
            v-if="heroEvents.length === 0"
            class="relative h-85 w-full max-w-85 mx-auto flex items-center justify-center"
          >
            <div class="text-slate-300 text-sm">Memuat event...</div>
          </div>
          <div v-else class="relative h-85 w-full max-w-85 mx-auto">
            <div
              v-for="(ev, i) in heroEvents"
              :key="ev.slug ?? i"
              @click="activeIdx = i"
              class="group absolute inset-x-0 top-0 overflow-hidden bg-white rounded-2xl border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-5 cursor-pointer"
              :style="{
                transform: `translateY(${(i - activeIdx + heroEvents.length) % heroEvents.length === 0 ? 0 : (i - activeIdx + heroEvents.length) % heroEvents.length === 1 ? 18 : 36}px) scale(${(i - activeIdx + heroEvents.length) % heroEvents.length === 0 ? 1 : (i - activeIdx + heroEvents.length) % heroEvents.length === 1 ? 0.95 : 0.9})`,
                opacity:
                  (i - activeIdx + heroEvents.length) % heroEvents.length === 0
                    ? 1
                    : (i - activeIdx + heroEvents.length) %
                          heroEvents.length ===
                        1
                      ? 0.75
                      : 0.45,
                zIndex:
                  (i - activeIdx + heroEvents.length) % heroEvents.length === 0
                    ? 30
                    : (i - activeIdx + heroEvents.length) %
                          heroEvents.length ===
                        1
                      ? 20
                      : 10,
                transition: 'all 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transformOrigin: 'top center',
              }"
            >
              <div
                class="pointer-events-none absolute inset-0 overflow-hidden"
                :style="{ color: CARD_ACCENTS[i % CARD_ACCENTS.length] }"
                aria-hidden="true"
              >
                <svg
                  class="absolute inset-0 h-full w-full opacity-80 transition-transform duration-500 group-hover:scale-[1.02]"
                  viewBox="0 0 320 240"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M28 174C72 128 108 194 154 143C198 94 228 116 296 62"
                    stroke="currentColor"
                    stroke-opacity="0.1"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M22 202C78 160 118 218 174 168C218 130 250 144 302 110"
                    stroke="currentColor"
                    stroke-opacity="0.055"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M34 58h72M34 76h46M34 94h58"
                    stroke="currentColor"
                    stroke-opacity="0.075"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <g
                    stroke="currentColor"
                    stroke-opacity="0.12"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  >
                    <path d="M182 42h18M191 33v18" />
                    <path d="M58 126h14M65 119v14" />
                    <path d="M276 154h18M285 145v18" />
                  </g>
                </svg>
                <Ticket
                  class="absolute -bottom-6 -right-5 rotate-[-8deg] opacity-[0.07] transition-all duration-500 group-hover:rotate-[-3deg] group-hover:scale-110 group-hover:opacity-[0.12] h-32 w-32"
                  :stroke-width="1.4"
                />
              </div>

              <div
                class="relative h-1.5 w-16 rounded-full mb-4"
                :style="{ background: CARD_ACCENTS[i % CARD_ACCENTS.length] }"
              />
              <div class="relative flex items-center justify-between mb-3">
                <span
                  class="text-xs font-bold uppercase tracking-widest"
                  :style="{ color: CARD_ACCENTS[i % CARD_ACCENTS.length] }"
                  >{{ ev.type }}</span
                >
                <span
                  :class="`text-[11px] font-semibold px-2.5 py-1 rounded-full ${getEventTag(ev).className}`"
                  >{{ getEventTag(ev).text }}</span
                >
              </div>
              <h3
                class="relative text-lg font-extrabold text-slate-900 leading-tight mb-4 line-clamp-2"
              >
                {{ ev.title }}
              </h3>
              <div class="relative flex flex-col gap-2 mb-5">
                <div class="flex items-center gap-2 text-slate-500 text-sm">
                  <MapPin :size="14" class="shrink-0" /><span
                    class="truncate"
                    >{{ ev.is_online ? "Online" : ev.address_title }}</span
                  >
                </div>
                <div class="flex items-center gap-2 text-slate-500 text-sm">
                  <CalendarDays :size="14" class="shrink-0" /><span>{{
                    formatEventDate(ev.start_date)
                  }}</span>
                </div>
              </div>
              <div class="relative mb-3">
                <div class="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span class="flex items-center gap-1"
                    ><Users :size="12" />
                    {{ ev.total_sold.toLocaleString("id-ID") }} peserta</span
                  >
                  <span
                    >{{
                      Math.round(
                        (ev.max_capacity > 0
                          ? ev.total_sold / ev.max_capacity
                          : 0) * 100,
                      )
                    }}% terisi</span
                  >
                </div>
                <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-700"
                    :style="{
                      width: `${(ev.max_capacity > 0 ? ev.total_sold / ev.max_capacity : 0) * 100}%`,
                      background: CARD_ACCENTS[i % CARD_ACCENTS.length],
                    }"
                  />
                </div>
              </div>
              <div
                class="relative flex items-center justify-between pt-2 border-t border-slate-50"
              >
                <div class="flex items-center gap-1 text-slate-400 text-xs">
                  <Ticket :size="12" />
                  <span>{{
                    ev.ticket_price === 0
                      ? "Gratis"
                      : `Rp ${ev.ticket_price.toLocaleString("id-ID")}`
                  }}</span>
                </div>
                <NuxtLink
                  :to="`/events/${ev.slug}`"
                  class="flex items-center gap-1 text-xs font-bold text-primary hover:gap-2 transition-all"
                >
                  Lihat detail <ArrowUpRight :size="13" />
                </NuxtLink>
              </div>
            </div>
            <div
              class="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
            >
              <button
                v-for="(_, i) in heroEvents"
                :key="i"
                @click="activeIdx = i"
                class="transition-all duration-300"
                :style="{
                  width: i === activeIdx ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '9999px',
                  background: i === activeIdx ? '#002cee' : '#cbd5e1',
                }"
              />
            </div>
          </div>
          <NuxtLink
            to="/events"
            class="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary border-b-2 border-primary/30 hover:border-primary transition-all duration-200 pb-0.5"
          >
            Lihat semua event <ArrowUpRight :size="15" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="relative z-10 pb-8 lg:hidden">
      <div class="w-full lg:hidden">
        <div class="flex items-center justify-between mb-3 px-4 sm:px-6">
          <div class="flex items-center gap-2">
            <Ticket :size="13" class="text-primary" />
            <span
              class="text-[11px] font-bold text-slate-500 uppercase tracking-widest"
              >Event Berlangsung</span
            >
          </div>
          <NuxtLink
            to="/events"
            class="flex items-center gap-1 text-xs font-bold text-primary"
            >Lihat semua <ChevronRight :size="13"
          /></NuxtLink>
        </div>
        <div class="relative">
          <div
            class="flex gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-6 pb-2"
          >
            <NuxtLink
              v-for="(ev, i) in heroEvents"
              :key="ev.slug ?? i"
              :to="`/events/${ev.slug}`"
              class="group relative shrink-0 w-60 overflow-hidden bg-white rounded-xl border border-slate-100 shadow-sm p-4 block hover:shadow-md transition-shadow"
            >
              <div
                class="pointer-events-none absolute inset-0 overflow-hidden"
                :style="{ color: CARD_ACCENTS[i % CARD_ACCENTS.length] }"
                aria-hidden="true"
              >
                <svg
                  class="absolute inset-0 h-full w-full opacity-80 transition-transform duration-500 group-hover:scale-[1.02]"
                  viewBox="0 0 320 240"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M28 174C72 128 108 194 154 143C198 94 228 116 296 62"
                    stroke="currentColor"
                    stroke-opacity="0.1"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M22 202C78 160 118 218 174 168C218 130 250 144 302 110"
                    stroke="currentColor"
                    stroke-opacity="0.055"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M34 58h72M34 76h46M34 94h58"
                    stroke="currentColor"
                    stroke-opacity="0.075"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <g
                    stroke="currentColor"
                    stroke-opacity="0.12"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  >
                    <path d="M182 42h18M191 33v18" />
                    <path d="M58 126h14M65 119v14" />
                    <path d="M276 154h18M285 145v18" />
                  </g>
                </svg>
                <Ticket
                  class="absolute -bottom-6 -right-5 rotate-[-8deg] opacity-[0.07] transition-all duration-500 group-hover:rotate-[-3deg] group-hover:scale-110 group-hover:opacity-[0.12] h-24 w-24"
                  :stroke-width="1.4"
                />
              </div>

              <div class="relative flex items-center justify-between mb-2">
                <span
                  class="text-[10px] font-bold uppercase tracking-widest"
                  :style="{ color: CARD_ACCENTS[i % CARD_ACCENTS.length] }"
                  >{{ ev.type }}</span
                >
                <span
                  :class="`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getEventTag(ev).className}`"
                  >{{ getEventTag(ev).text }}</span
                >
              </div>
              <h3
                class="relative text-sm font-extrabold text-slate-900 leading-tight mb-2 line-clamp-2"
              >
                {{ ev.title }}
              </h3>
              <div
                class="relative flex items-center gap-3 text-xs text-slate-400 mb-3"
              >
                <span class="flex items-center gap-1"
                  ><MapPin :size="11" /><span class="truncate max-w-20">{{
                    ev.is_online ? "Online" : ev.address_title
                  }}</span></span
                >
                <span class="flex items-center gap-1"
                  ><CalendarDays :size="11" />{{
                    formatEventDate(ev.start_date)
                  }}</span
                >
              </div>
              <div
                class="relative h-1 bg-slate-100 rounded-full overflow-hidden"
              >
                <div
                  class="h-full rounded-full"
                  :style="{
                    width: `${(ev.max_capacity > 0 ? ev.total_sold / ev.max_capacity : 0) * 100}%`,
                    background: CARD_ACCENTS[i % CARD_ACCENTS.length],
                  }"
                />
              </div>
              <p class="relative text-[10px] text-slate-400 mt-1">
                {{
                  Math.round(
                    (ev.max_capacity > 0
                      ? ev.total_sold / ev.max_capacity
                      : 0) * 100,
                  )
                }}% terisi
              </p>
            </NuxtLink>
          </div>
          <div
            class="absolute right-0 top-0 h-full w-12 bg-linear-to-l from-[#f9fafb] to-transparent pointer-events-none"
          />
        </div>
      </div>
    </div>
  </section>
</template>
