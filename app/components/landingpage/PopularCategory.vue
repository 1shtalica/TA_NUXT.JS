<script setup lang="ts">
import {
  Clapperboard,
  Laptop,
  Trophy,
  Palette,
  Briefcase,
  Pizza,
  Image as ImageIcon,
  Drama,
  ChevronRight,
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Landmark,
  HeartPulse,
  Shirt,
  HandHeart,
  MapPin,
  Gamepad2,
  Baby,
  Presentation,
  Images,
  Tag,
} from "@lucide/vue";
import { cn } from "~/lib/utils";

const CATEGORY_PRESENTATION: Record<
  string,
  {
    description: string;
    icon: any;
    color: string;
    bg: string;
  }
> = {
  Pendidikan: {
    description: "Kelas, pelatihan, dan program belajar",
    icon: BookOpen,
    color: "#2563eb",
    bg: "#eff6ff",
  },
  Bisnis: {
    description: "Networking, seminar, dan founder",
    icon: Briefcase,
    color: "#3b82f6",
    bg: "#eff6ff",
  },
  Teknologi: {
    description: "Talkshow, kelas, dan hackathon",
    icon: Laptop,
    color: "#10b981",
    bg: "#ecfdf5",
  },
  Hiburan: {
    description: "Konser, gig, dan festival",
    icon: Clapperboard,
    color: "#6366f1",
    bg: "#eef2ff",
  },
  Olahraga: {
    description: "Kompetisi dan aktivitas komunitas",
    icon: Trophy,
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  Komunitas: {
    description: "Kumpul komunitas dan agenda bersama",
    icon: Users,
    color: "#14b8a6",
    bg: "#f0fdfa",
  },
  Budaya: {
    description: "Tradisi, budaya, dan kegiatan publik",
    icon: Landmark,
    color: "#d97706",
    bg: "#fffbeb",
  },
  Keagamaan: {
    description: "Kajian, perayaan, dan acara rohani",
    icon: HandHeart,
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  Kesehatan: {
    description: "Wellness, edukasi, dan aktivitas sehat",
    icon: HeartPulse,
    color: "#dc2626",
    bg: "#fef2f2",
  },
  Lifestyle: {
    description: "Gaya hidup, hobi, dan pengalaman baru",
    icon: Shirt,
    color: "#db2777",
    bg: "#fdf2f8",
  },
  Sosial: {
    description: "Aksi sosial dan gerakan berdampak",
    icon: HandHeart,
    color: "#059669",
    bg: "#ecfdf5",
  },
  Seni: {
    description: "Pameran, instalasi, dan karya",
    icon: ImageIcon,
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
  Kuliner: {
    description: "Festival rasa dan kelas masak",
    icon: Pizza,
    color: "#ef4444",
    bg: "#fef2f2",
  },
  Pariwisata: {
    description: "Tur, destinasi, dan perjalanan lokal",
    icon: MapPin,
    color: "#0891b2",
    bg: "#ecfeff",
  },
  Gaming: {
    description: "Turnamen, mabar, dan komunitas game",
    icon: Gamepad2,
    color: "#9333ea",
    bg: "#faf5ff",
  },
  Keluarga: {
    description: "Aktivitas ramah keluarga dan anak",
    icon: Baby,
    color: "#ea580c",
    bg: "#fff7ed",
  },
  Festival: {
    description: "Agenda budaya dan perayaan publik",
    icon: Drama,
    color: "#06b6d4",
    bg: "#ecfeff",
  },
  Workshop: {
    description: "Workshop, portfolio, dan kreatif",
    icon: Palette,
    color: "#ec4899",
    bg: "#fdf2f8",
  },
  Seminar: {
    description: "Sesi pakar, panel, dan diskusi",
    icon: Presentation,
    color: "#4f46e5",
    bg: "#eef2ff",
  },
  Pameran: {
    description: "Showcase, expo, dan ruang karya",
    icon: Images,
    color: "#0f766e",
    bg: "#f0fdfa",
  },
  lainnya: {
    description: "Kategori lain yang tersedia",
    icon: Tag,
    color: "#64748b",
    bg: "#f8fafc",
  },
};

const OTHER_CATEGORY_VALUE = "lainnya";
const MAX_VISIBLE_CATEGORIES = 9;

const getCategoryPresentation = (name: string) =>
  CATEGORY_PRESENTATION[name] ?? CATEGORY_PRESENTATION.lainnya;

const isOtherCategory = (name: string) =>
  name.toLowerCase() === OTHER_CATEGORY_VALUE;

const getCategoryLabel = (name: string) =>
  isOtherCategory(name) ? "Lainnya" : name;

const getVisibleCategories = (categories: string[]) => {
  const uniqueCategories = [...new Set(categories)];
  const otherCategory =
    uniqueCategories.find(isOtherCategory) ?? OTHER_CATEGORY_VALUE;
  const primaryCategories = uniqueCategories
    .filter((name) => !isOtherCategory(name))
    .slice(0, MAX_VISIBLE_CATEGORIES - 1);
  return [...primaryCategories, otherCategory];
};

import { EventService } from '~/services/event-service';

const buildCategoryCards = (categories: string[]) =>
  getVisibleCategories(categories).map((name) => ({
    value: name,
    name: getCategoryLabel(name),
    href: isOtherCategory(name) ? "/events" : `/events?category=${encodeURIComponent(name)}`,
    ...getCategoryPresentation(name),
  }));

const categoryNames = ref<string[]>([]);
const isLoading = ref(true);
const categories = computed(() => buildCategoryCards(categoryNames.value));

onMounted(async () => {
  const fetchedCategories = await EventService.getEventCategories($fetch);
  categoryNames.value = fetchedCategories;
  isLoading.value = false;
});
</script>

<template>
  <section class="relative overflow-hidden bg-[#f9fafb] py-10 md:py-12">
    <div
      class="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      <div
        class="absolute inset-0"
        :style="{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.24,
        }"
      />
    </div>

    <div
      class="relative z-10 container mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12"
    >
      <div
        class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div class="max-w-2xl">
          <div
            class="mb-2 inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 shadow-sm ring-1 ring-slate-200"
          >
            <Sparkles :size="13" class="text-primary" />
            {{ isLoading ? "Memuat kategori" : `${categories.length} kategori tersedia` }}
          </div>
          <h2 class="text-xl font-bold text-accent md:text-3xl">
            Kategori Populer
          </h2>
          <p class="mt-1.5 text-sm text-muted md:text-base">
            Pilih jalur tercepat ke event yang sesuai minatmu.
          </p>
        </div>

        <Button
          variant="link"
          as-child
          class="self-start px-0 md:self-auto md:px-4"
        >
          <NuxtLink to="/events">
            Lihat Semua <ArrowRight :size="18" />
          </NuxtLink>
        </Button>
      </div>

      <div
        v-if="isLoading"
        class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-3.5"
      >
        <Skeleton
          v-for="index in MAX_VISIBLE_CATEGORIES"
          :key="index"
          :class="
            cn(
              'min-h-30 rounded-xl md:min-h-32',
              index === 1 && 'md:col-span-2 md:row-span-2 md:min-h-68',
            )
          "
        />
      </div>

      <div v-else class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-3.5">
        <NuxtLink
          v-for="(category, index) in categories"
          :key="category.value"
          :to="category.href"
          :class="
            cn(
              'group relative min-h-30 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 md:min-h-32 md:p-3.5',
              'hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              index === 0 && 'md:col-span-2 md:row-span-2 md:min-h-68 md:p-5',
            )
          "
          :style="{
            '--category-color': category.color,
          } as any"
        >
          <div
            class="absolute inset-x-0 top-0 h-1 opacity-80"
            :style="{ background: category.color }"
          />

          <div
            class="absolute -right-8 -top-8 h-20 w-20 rounded-full transition-transform duration-300 group-hover:scale-125 md:h-24 md:w-24"
            :style="{ background: category.bg }"
          />

          <component
            :is="category.icon"
            :class="
              cn(
                'absolute -bottom-5 -right-4 h-20 w-20 rotate-[-8deg] opacity-[0.075] transition-all duration-300 group-hover:rotate-[-2deg] group-hover:scale-110 group-hover:opacity-[0.11]',
                index === 0 && 'md:-bottom-8 md:-right-6 md:h-34 md:w-34',
              )
            "
            :stroke-width="1.6"
            aria-hidden="true"
            :style="{ color: category.color }"
          />

          <svg
            class="absolute inset-0 h-full w-full opacity-70 transition-transform duration-300 group-hover:scale-[1.03]"
            viewBox="0 0 260 180"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
            :style="{ color: category.color }"
          >
            <path
              d="M152 16h96M172 32h68M204 48h44"
              stroke="currentColor"
              stroke-opacity="0.09"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M16 140C48 110 70 156 104 126C134 99 154 118 180 94C208 68 226 82 250 56"
              stroke="currentColor"
              stroke-opacity="0.11"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M190 118c14 0 26 12 26 26M190 132c7 0 12 5 12 12"
              stroke="currentColor"
              stroke-opacity="0.1"
              stroke-width="2"
              stroke-linecap="round"
            />
            <g fill="currentColor" opacity="0.1">
              <circle cx="42" cy="34" r="4" />
              <circle cx="74" cy="24" r="2.5" />
              <circle cx="232" cy="128" r="3" />
            </g>
          </svg>

          <div class="relative flex h-full flex-col justify-between gap-3.5">
            <div class="flex items-start justify-between gap-3">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-xl ring-1 ring-inset ring-white/70 transition-transform duration-300 group-hover:scale-105 md:h-10 md:w-10"
                :style="{
                  background: category.bg,
                  color: category.color,
                }"
              >
                <component :is="category.icon" :size="19" :stroke-width="2.4" />
              </div>
              <span
                class="rounded-2xl bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-slate-500 ring-1 ring-slate-200"
              >
                Kategori
              </span>
            </div>

            <div>
              <h3
                :class="
                  cn(
                    'text-base font-bold leading-tight text-accent md:text-lg',
                    index === 0 && 'md:text-xl',
                  )
                "
              >
                {{ category.name }}
              </h3>
              <p
                :class="
                  cn(
                    'mt-1 line-clamp-2 text-xs leading-relaxed text-muted',
                    index === 0 && 'md:mt-1.5 md:max-w-xs md:text-sm',
                  )
                "
              >
                {{ category.description }}
              </p>
            </div>

            <div
              class="flex items-center justify-between border-t border-slate-100 pt-2.5"
            >
              <span class="text-[11px] font-semibold text-slate-400">
                Lihat event
              </span>
              <span
                class="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:text-white"
                :class="'group-hover:bg-[var(--category-color)]'"
              >
                <ChevronRight :size="13" />
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
