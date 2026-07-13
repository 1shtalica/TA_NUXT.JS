<script setup lang="ts">
import { MapPin, Users, Heart, ImageOff, Ticket } from "@lucide/vue";
import { formatCurrency, cn } from "@/lib/utils";

interface EventCardProps {
  title: string;
  slug: string;
  category: string;
  date: string;
  location: string;
  price: number;
  originalPrice?: number;
  organizer: string;
  image: string;
  isOnline?: boolean;
  ticketSold?: number;
  maxQuota?: number;
  variant?: "vertical" | "horizontal";
  priority?: boolean;
}

const props = withDefaults(defineProps<EventCardProps>(), {
  isOnline: false,
  ticketSold: 0,
  maxQuota: 100,
  variant: "vertical",
  priority: false,
});

const imgError = ref(false);

const dateObj = new Date(props.date);
const isValidDate = !isNaN(dateObj.getTime());
const day = isValidDate
  ? dateObj.getUTCDate()
  : props.date.split(" ")[0];
const month = isValidDate
  ? dateObj.toLocaleString("id-ID", { month: "short", timeZone: "UTC" })
  : props.date.split(" ")[1]?.substring(0, 3);
const year = isValidDate
  ? dateObj.getUTCFullYear()
  : props.date.split(" ")[2] || new Date().getUTCFullYear();
</script>

<template>
  <NuxtLink :to="`/events/${slug}`" class="group block h-full w-full">
    <Card
      :class="
        cn(
          'h-full flex overflow-hidden transition-all duration-300 transform hover:-translate-y-2 rounded-3xl bg-white border hover:border-primary/50 shadow-sm hover:shadow-lg',
          variant === 'horizontal' ? 'flex-row h-55' : 'flex-col',
        )
      "
    >

      <div
        :class="
          cn(
            'relative overflow-hidden bg-slate-50 shrink-0',
            variant === 'horizontal' ? 'w-65 h-full' : 'w-full aspect-video',
          )
        "
      >
        <div
          v-if="imgError"
          class="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400"
        >
          <ImageOff :size="32" class="mb-2 opacity-50" />
          <span class="text-xs font-medium">Image not available</span>
        </div>
        <NuxtImg
      :src="image"
      :alt="`Banner ${title}`"
      format="webp"
      quality="75"
      :loading="priority ? 'eager' : 'lazy'"
      :preload="priority ? { fetchPriority: 'high' } : false"
      sizes="sm:100vw md:50vw lg:33vw"
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      @error="imgError = true"
    />

        <div class="absolute top-4 left-4 z-10">
          <Badge
            v-if="isOnline"
            class="bg-yellow-400 hover:bg-yellow-500 text-white border-none rounded-full px-4 py-1 font-bold shadow-sm text-xs"
          >
            Online
          </Badge>
          <Badge
            v-else
            variant="secondary"
            class="bg-white/90 backdrop-blur-sm text-slate-700 rounded-full px-3 py-1 shadow-sm text-xs font-semibold"
          >
            Offline
          </Badge>
        </div>

        <button
          disabled
          class="absolute top-4 right-4 z-10 bg-white p-2 rounded-full text-slate-400 shadow-sm cursor-not-allowed opacity-80"
        >
          <Heart :size="18" />
        </button>
      </div>


      <CardContent
        class="flex flex-col px-4 pb-4 pt-2 sm:pt-2 sm:pb-4 sm:px-5 h-full relative overflow-hidden"
      >
        <div
          class="pointer-events-none absolute inset-0 overflow-hidden text-indigo-500"
          aria-hidden="true"
        >
          <Ticket
            :class="
              cn(
                'absolute -bottom-7 -right-5 h-30 w-30 rotate-[-8deg] opacity-[0.08] transition-all duration-300 group-hover:rotate-[-3deg] group-hover:scale-110 group-hover:opacity-[0.13]',
                variant === 'horizontal' && 'h-34 w-34',
              )
            "
            :stroke-width="1.4"
          />
        </div>

        <div class="relative z-10 flex gap-4 items-start">
          <div
            class="flex flex-col items-center justify-center w-14 py-2 min-h-17 bg-indigo-50/80 text-indigo-600 rounded-xl shrink-0 border border-indigo-100/50"
          >
            <span class="text-xl font-bold leading-none tracking-tight">{{
              day
            }}</span>
            <span class="text-[9px] font-semibold mt-1 leading-none">{{
              month
            }}</span>
            <span
              class="text-[8px] font-semibold text-indigo-400 mt-0.5 leading-none tracking-wider"
              >{{ year }}</span
            >
          </div>

          <div class="flex flex-col gap-1 w-full">
            <span
              class="text-xs font-semibold text-indigo-500 tracking-wide line-clamp-1"
              >{{ category }}</span
            >
            <h3
              class="font-bold text-base leading-snug text-slate-900 line-clamp-2"
              :title="title"
            >
              {{ title }}
            </h3>
            <div
              class="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5"
            >
              <MapPin :size="12" class="shrink-0" />
              <span class="line-clamp-1">{{ location }}</span>
            </div>
            <div class="text-[10px] text-slate-400 mt-1">
              Oleh
              <span class="font-medium text-slate-600">{{ organizer }}</span>
            </div>
          </div>
        </div>

        <div class="relative z-10 mt-auto pt-5 flex items-end justify-between">
          <div class="flex flex-col">
            <span
              v-if="
                originalPrice &&
                Number(originalPrice) > 0 &&
                Number(originalPrice) > price
              "
              class="text-[10px] text-slate-400 line-through decoration-slate-300"
            >
              {{ formatCurrency(originalPrice) }}
            </span>
            <span class="font-bold text-slate-900 text-base">
              {{ price === 0 ? "Gratis" : formatCurrency(price) }}
            </span>
          </div>
          <div
            class="flex items-center gap-1.5 text-slate-400 text-xs font-medium"
          >
            <Users :size="14" />
            <span>{{ ticketSold }}/{{ maxQuota }}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </NuxtLink>
</template>
