<script setup lang="ts">
import { format, isSameDay } from "date-fns";
import { id as localeId } from "date-fns/locale";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ExternalLink,
  Plus,
  CircleCheck,
} from "@lucide/vue";

const props = defineProps<{ event: any }>();

const avatarError = ref(false);

const startDate = computed(() =>
  props.event.event_start_date ? new Date(props.event.event_start_date) : null,
);
const endDate = computed(() =>
  props.event.event_end_date ? new Date(props.event.event_end_date) : null,
);

const formatDateRange = (start: Date | null, end: Date | null) => {
  if (!start || !end) return "Tanggal belum ditentukan";
  if (isSameDay(start, end)) {
    return format(start, "dd MMMM yyyy", { locale: localeId });
  }
  return `${format(start, "dd MMMM yyyy", { locale: localeId })} - ${format(end, "dd MMMM yyyy", { locale: localeId })}`;
};

const formatTimeRange = (start: Date | null, end: Date | null) => {
  if (!start || !end) return "-";
  return `${format(start, "HH:mm", { locale: localeId })} - ${format(end, "HH:mm", { locale: localeId })} WIB`;
};

const eventDateString = computed(() =>
  formatDateRange(startDate.value, endDate.value),
);
const eventTimeString = computed(() =>
  formatTimeRange(startDate.value, endDate.value),
);

const regStartDate = computed(() =>
  props.event.start_registration_date
    ? new Date(props.event.start_registration_date)
    : null,
);
const regEndDate = computed(() =>
  props.event.end_registration_date
    ? new Date(props.event.end_registration_date)
    : null,
);

const regDateString = computed(() =>
  formatDateRange(regStartDate.value, regEndDate.value),
);
const regTimeString = computed(() =>
  formatTimeRange(regStartDate.value, regEndDate.value),
);

const ticketTypeBadge = computed(() => {
  if (
    !props.event.ticket_categories ||
    props.event.ticket_categories.length === 0
  )
    return "Gratis";
  const hasFree = props.event.ticket_categories.some((t: any) => t.price === 0);
  const hasPaid = props.event.ticket_categories.some((t: any) => t.price > 0);

  if (hasFree && hasPaid) return "Gratis & Berbayar";
  if (hasPaid) return "Berbayar";
  return "Gratis";
});
</script>

<template>
  <section class="w-full flex flex-col items-center justify-between relative">
    <div
      class="w-full h-fit p-5 sm:p-6 lg:p-7 bg-white shadow-md shadow-slate-900/5 border border-slate-200/80 rounded-2xl"
    >
      <div class="flex flex-col gap-5 md:gap-6">
        <div class="flex flex-wrap items-center gap-2">
          <Badge variant="brand">{{ event.category }}</Badge>

          <Badge
            :class="
              event.is_online
                ? 'bg-linear-to-r from-blue-600 to-blue-800 text-white font-semibold border-none px-3 rounded-full uppercase text-[10px] tracking-wide shadow-sm'
                : 'bg-muted text-white shadow-sm'
            "
          >
            {{ event.is_online ? "Online" : "Offline" }}
          </Badge>

          <Badge
            class="bg-secondary-light text-secondary border border-secondary rounded-full px-2 flex items-center gap-1"
          >
            {{ ticketTypeBadge }}
          </Badge>
        </div>

        <div class="flex items-start gap-3 py-3 md:py-4">
          <div class="mt-1 h-9 w-1 bg-primary rounded-full shrink-0"></div>
          <h1
            class="text-3xl md:text-4xl font-bold text-slate-950 leading-[1.12] tracking-normal"
          >
            {{ event.title }}
          </h1>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div
            class="flex flex-row items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5"
          >
            <div
              class="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-primary-light text-primary"
            >
              <Calendar :size="16" />
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-1">
                <span
                  class="text-[11px] tracking-wider font-semibold text-slate-500"
                  >JADWAL EVENT</span
                >
              </div>
              <p
                class="text-sm md:text-base font-semibold text-slate-900 mt-0.5 leading-snug"
              >
                {{ eventDateString }}
              </p>
              <p class="text-xs text-slate-500">{{ eventTimeString }}</p>
            </div>
          </div>

          <div
            class="flex flex-row items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5"
          >
            <div
              class="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-primary-light text-primary"
            >
              <Clock :size="16" />
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-1">
                <span
                  class="text-[11px] tracking-wider font-semibold text-slate-500"
                  >MASA REGISTRASI</span
                >
              </div>
              <p
                class="text-sm md:text-base font-semibold text-slate-900 mt-0.5 leading-snug"
              >
                {{ regDateString }}
              </p>
              <p v-if="regTimeString" class="text-xs text-slate-500">
                {{ regTimeString }}
              </p>
            </div>
          </div>

          <div
            class="flex flex-row items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5"
          >
            <div
              class="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-primary-light text-primary"
            >
              <MapPin :size="16" />
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-1">
                <span
                  class="text-[11px] tracking-wider font-semibold text-slate-500"
                  >LOKASI</span
                >
              </div>
              <p
                class="text-sm md:text-base font-semibold text-slate-900 line-clamp-2 leading-snug"
                :title="event.address?.raw_address"
              >
                {{
                  event.is_online
                    ? "Online Meeting"
                    : event.address?.raw_address || "Lokasi Event"
                }}
              </p>
              <p
                v-if="event.address?.city && event.address?.province"
                class="text-xs text-slate-500"
              >
                {{ event.address.city }}, {{ event.address.province }}
              </p>
              <a
                v-if="!event.is_online && event.address?.maps_url"
                :href="event.address.maps_url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-primary hover:text-primary-hover transition-colors bg-primary-light hover:bg-primary/10 px-2.5 py-1 rounded-xl w-fit"
              >
                <MapPin :size="11" />
                Lihat di Peta
                <ExternalLink :size="10" />
              </a>
            </div>
          </div>

          <div
            class="flex flex-row items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5"
          >
            <div
              class="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-primary-light text-primary mt-0.5"
            >
              <Users :size="16" />
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-1">
                <span
                  class="text-[11px] tracking-wider font-semibold text-slate-500"
                  >PARTISIPAN</span
                >
              </div>
              <p class="text-sm md:text-base font-semibold text-slate-900">
                {{ event.total_sold }}/{{ event.max_capacity || "-" }} terdaftar
              </p>
            </div>
          </div>
        </div>

        <Separator orientation="horizontal" />

        <div
          v-if="event.organizer"
          class="bg-primary-light/70 py-4 px-4 sm:px-5 rounded-2xl border border-primary/10"
        >
          <div
            class="w-full flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div class="flex flex-row items-center gap-5 w-full md:w-auto">
              <div class="shrink-0">
                <NuxtLink to="#" class="hover:opacity-80 transition-opacity">
                  <Avatar class="h-12 w-12 ring-2 ring-white shadow-sm">
                    <NuxtImg
                      v-if="event.organizer.profile_image_url && !avatarError"
                      :src="event.organizer.profile_image_url"
                      :alt="event.organizer.name"
                      format="webp"
                      quality="75"
                      loading="lazy"
                      sizes="48px"
                      class="w-full h-full object-cover"
                      @error="avatarError = true"
                    />
                    <AvatarFallback v-else>{{
                      event.organizer.name.substring(0, 2).toUpperCase()
                    }}</AvatarFallback>
                  </Avatar>
                </NuxtLink>
              </div>
              <div class="flex flex-col">
                <div class="flex flex-row items-center gap-1">
                  <p class="font-semibold text-slate-900 leading-tight">
                    {{ event.organizer.name }}
                  </p>
                  <CircleCheck
                    v-if="event.organizer.verification_status === 'verified'"
                    :size="16"
                    class="text-blue-500 fill-blue-50"
                  />
                </div>
                <div class="pt-1 text-slate-600 leading-relaxed">
                  <p class="text-sm line-clamp-2">
                    {{ event.organizer.description }}
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="default"
              size="sm"
              class="rounded-xl px-5 shrink-0"
              disabled
            >
              <Plus :size="14" />
              Follow
            </Button>
          </div>
        </div>

        <div class="pt-2 md:pt-3">
          <div class="flex items-center gap-2 mb-4">
            <div class="h-7 w-1 bg-primary rounded-full"></div>
            <h4
              class="text-xl md:text-2xl font-bold text-slate-950 leading-tight"
            >
              Tentang Event
            </h4>
          </div>
          <ClientOnly>
            <LazyTipTapViewer :content="event.description?.content || ''" />
            <template #fallback>
              <p class="text-slate-600 leading-relaxed text-sm md:text-base">
                {{ event.description?.content ? 'Memuat deskripsi...' : 'Belum ada deskripsi.' }}
              </p>
            </template>
          </ClientOnly>
        </div>

        <div
          v-if="event.rundowns && event.rundowns.length > 0"
          class="pt-2 md:pt-3"
        >
          <div class="flex items-center gap-2 mb-4">
            <div class="h-7 w-1 bg-primary rounded-full"></div>
            <h4
              class="text-xl md:text-2xl font-bold text-slate-950 leading-tight"
            >
              Rundown Acara
            </h4>
          </div>

          <div class="flex flex-col gap-4">
            <div
              v-for="(item, index) in event.rundowns"
              :key="item.id ?? index"
              class="group flex flex-col md:flex-row gap-3 md:gap-5 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-primary-light/10 hover:shadow-sm transition-all duration-300"
            >
              <div
                class="shrink-0 flex flex-col justify-start md:justify-center pt-1"
              >
                <div
                  class="flex items-center gap-2 text-sm font-semibold text-primary bg-white border border-primary/10 px-3 py-1.5 rounded-xl shadow-sm w-fit"
                >
                  <Clock :size="14" class="md:w-5 md:h-5" />
                  <span>{{ item.start_time }} - {{ item.end_time }}</span>
                </div>
              </div>

              <div
                :class="`flex flex-col w-full ${item.location || item.description ? 'gap-2' : 'justify-center'}`"
              >
                <h5
                  class="font-semibold text-slate-950 text-base md:text-lg leading-tight group-hover:text-primary transition-colors"
                >
                  {{ item.title }}
                </h5>

                <div
                  v-if="item.location"
                  class="flex items-center gap-2 text-sm text-slate-600"
                >
                  <MapPin :size="16" class="text-primary shrink-0" />
                  <span class="font-medium">{{ item.location }}</span>
                </div>

                <div
                  v-if="item.description"
                  class="mt-1 pb-1 border-l-2 border-slate-200 pl-3 ml-1"
                >
                  <p class="text-sm text-slate-600 leading-relaxed">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
