<script setup lang="ts">
import {
  Minus,
  Plus,
  Link as LinkIcon,
  Globe,
  X,
  Phone,
  Clock,
  Flame,
} from "lucide-vue-next";
import { cn } from "~/lib/utils";
import { toast } from "vue-sonner";

const props = defineProps<{ event: any }>();

const TICKET_COLORS = [
  {
    bg: "bg-pink-100",
    border: "border-pink-200",
    ring: "ring-pink-400 border-pink-400",
    text: "text-pink-600",
  },
  {
    bg: "bg-blue-100",
    border: "border-blue-200",
    ring: "ring-blue-400 border-blue-400",
    text: "text-blue-600",
  },
  {
    bg: "bg-emerald-100",
    border: "border-emerald-200",
    ring: "ring-emerald-400 border-emerald-400",
    text: "text-emerald-600",
  },
  {
    bg: "bg-amber-100",
    border: "border-amber-200",
    ring: "ring-amber-400 border-amber-400",
    text: "text-amber-600",
  },
  {
    bg: "bg-violet-100",
    border: "border-violet-200",
    ring: "ring-violet-400 border-violet-400",
    text: "text-violet-600",
  },
];

const getTicketColor = (index: number) => {
  return TICKET_COLORS[index % TICKET_COLORS.length] ?? TICKET_COLORS[0]!;
};

const pad = (n: number) => n.toString().padStart(2, "0");

const isPaid = computed(
  () => props.event.ticket_categories?.some((t: any) => t.price > 0) || false,
);
const isFreeEventWithNoTickets = computed(
  () => !isPaid.value && (props.event.ticket_categories?.length ?? 0) === 0,
);

const effectiveTickets = computed(() =>
  isFreeEventWithNoTickets.value
    ? [
        {
          id: "free-virtual",
          name: "Tiket Gratis",
          price: 0,
          quota: props.event.max_capacity || 0,
          booked: props.event.total_sold || 0,
          description: "Tiket masuk untuk event ini.",
          start_date_time: undefined,
          end_date_time: undefined,
        },
      ]
    : (props.event.ticket_categories ?? []),
);

const availableTicket = computed(() =>
  effectiveTickets.value.find((t: any) => t.quota === 0 || t.booked < t.quota),
);
const selectedTicketId = ref<string | null>(availableTicket.value?.id ?? null);
const qty = ref(1);
const currentTime = ref<Date | null>(null);

let timer: ReturnType<typeof setInterval>;
onMounted(() => {
  currentTime.value = new Date();
  timer = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const now = computed(() => currentTime.value?.getTime() ?? 0);
const startReg = computed(() =>
  props.event.start_registration_date
    ? new Date(props.event.start_registration_date).getTime()
    : 0,
);
const endReg = computed(() =>
  props.event.end_registration_date
    ? new Date(props.event.end_registration_date).getTime()
    : Infinity,
);

const isRegistrationUpcoming = computed(
  () =>
    props.event.status === "published" &&
    startReg.value > 0 &&
    now.value > 0 &&
    now.value < startReg.value,
);
const isRegistrationClosed = computed(
  () =>
    props.event.status !== "published" ||
    (now.value > 0 && now.value > endReg.value),
);
const isRegistrationOpen = computed(
  () =>
    props.event.status === "published" &&
    now.value > 0 &&
    !isRegistrationUpcoming.value &&
    !isRegistrationClosed.value,
);

const selectedTicket = computed(() =>
  effectiveTickets.value.find((t: any) => t.id === selectedTicketId.value),
);

const maxPurchase = computed(() => {
  if (!selectedTicket.value) return 0;
  const remaining =
    selectedTicket.value.quota > 0
      ? selectedTicket.value.quota - selectedTicket.value.booked
      : Infinity;
  const limitPerUser = props.event.max_ticket_per_user ?? 0;
  return limitPerUser > 0 ? Math.min(remaining, limitPerUser) : remaining;
});

const totalPrice = computed(() =>
  selectedTicket.value ? selectedTicket.value.price * qty.value : 0,
);

const formatRupiah = (num: number) => {
  if (num === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
};

const handleSelectTicket = (id: string, isSelectable: boolean) => {
  if (!isSelectable) return;
  selectedTicketId.value = id;
  qty.value = 1;
};

const handleShare = (platform: string) => {
  const url = window.location.href;
  const text = `Yuk ikut event seru ini: ${props.event.title} - ${url}`;
  switch (platform) {
    case "facebook":
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        "_blank",
      );
      break;
    case "x":
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        "_blank",
      );
      break;
    case "instagram":
      window.open(
        `https://www.instagram.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        "_blank",
      );
      break;
    case "whatsapp":
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
      break;
    case "telegram":
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        "_blank",
      );
      break;
    case "link":
      navigator.clipboard.writeText(url);
      toast.success("Link berhasil disalin!");
      break;
  }
};

// Utilities for countdown
const getDiffParts = (diff: number) => {
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { totalHours, days, hours, minutes, seconds };
};
</script>

<template>
  <section class="w-full flex flex-col relative z-20">
    <div
      class="w-full bg-white shadow-md shadow-slate-900/5 border border-slate-200/80 rounded-2xl sticky top-24 flex flex-col overflow-hidden"
      style="max-height: calc(100vh - 7rem)"
    >
      <div class="shrink-0 p-5 pb-2 flex flex-col gap-4 bg-white">
        <div>
          <p
            class="text-[11px] font-semibold uppercase tracking-wider text-primary"
          >
            Registrasi
          </p>
          <h3
            class="text-xl md:text-2xl font-bold text-slate-950 leading-tight"
          >
            Pilih Tiket
          </h3>
        </div>

        <template v-if="currentTime">
          <div
            v-if="isRegistrationUpcoming"
            class="p-3 bg-rose-50 border border-rose-200 rounded-xl flex flex-col items-center gap-1"
          >
            <div class="flex items-center gap-1.5">
              <Flame :size="13" class="text-rose-500 animate-bounce" />
              <span
                class="text-[11px] font-semibold text-rose-500 uppercase tracking-wider"
                >Pendaftaran dibuka dalam</span
              >
            </div>
            <span
              class="text-xl font-bold text-rose-600 font-mono tracking-wider animate-pulse"
            >
              {{ pad(getDiffParts(startReg - now).totalHours) }}:{{
                pad(getDiffParts(startReg - now).minutes)
              }}:{{ pad(getDiffParts(startReg - now).seconds) }}
            </span>
            <span class="text-[10px] text-rose-500/70 font-medium"
              >jam : menit : detik</span
            >
          </div>

          <div
            v-else-if="
              !isRegistrationUpcoming &&
              isRegistrationOpen &&
              endReg !== Infinity
            "
            class="p-3 bg-primary/5 border border-primary/15 rounded-xl flex flex-col items-center gap-1"
          >
            <template v-if="endReg - now < 1000 * 60 * 60 * 24">
              <div class="flex items-center gap-1.5">
                <Flame :size="13" class="text-rose-500 animate-bounce" />
                <span
                  class="text-[11px] font-semibold text-rose-500 uppercase tracking-wider"
                  >Pendaftaran ditutup dalam</span
                >
              </div>
              <span
                class="text-xl font-bold text-rose-600 font-mono tracking-wider animate-pulse"
              >
                {{ pad(getDiffParts(endReg - now).totalHours) }}:{{
                  pad(getDiffParts(endReg - now).minutes)
                }}:{{ pad(getDiffParts(endReg - now).seconds) }}
              </span>
              <span class="text-[10px] text-rose-500/70 font-medium"
                >jam : menit : detik</span
              >
            </template>
            <template v-else>
              <div class="flex items-center gap-1.5">
                <Clock :size="13" class="text-primary" />
                <span
                  class="text-[11px] font-semibold text-primary uppercase tracking-wider"
                  >Pendaftaran ditutup dalam</span
                >
              </div>
              <div class="flex items-center gap-3">
                <div
                  v-if="getDiffParts(endReg - now).days > 0"
                  class="flex items-center gap-3"
                >
                  <div class="text-center">
                    <p
                      class="text-xl font-bold text-primary font-mono leading-none"
                    >
                      {{ getDiffParts(endReg - now).days }}
                    </p>
                    <p class="text-[10px] text-primary/70 font-medium mt-0.5">
                      hari
                    </p>
                  </div>
                  <span class="text-primary/40 font-semibold text-base pb-3"
                    >:</span
                  >
                </div>
                <div class="text-center">
                  <p
                    class="text-xl font-bold text-primary font-mono leading-none"
                  >
                    {{ pad(getDiffParts(endReg - now).hours) }}
                  </p>
                  <p class="text-[10px] text-primary/70 font-medium mt-0.5">
                    jam
                  </p>
                </div>
                <span class="text-primary/40 font-semibold text-base pb-3"
                  >:</span
                >
                <div class="text-center">
                  <p
                    class="text-xl font-bold text-primary font-mono leading-none"
                  >
                    {{ pad(getDiffParts(endReg - now).minutes) }}
                  </p>
                  <p class="text-[10px] text-primary/70 font-medium mt-0.5">
                    menit
                  </p>
                </div>
              </div>
            </template>
          </div>

          <div
            v-if="isRegistrationClosed"
            class="p-3 bg-slate-100 border border-slate-200 rounded-xl text-center"
          >
            <span class="text-sm font-medium text-slate-600"
              >Pendaftaran Telah Ditutup</span
            >
          </div>
        </template>
      </div>

      <div
        class="flex-1 overflow-y-auto px-5 pb-4 flex flex-col gap-4 scrollbar-hide"
      >
        <div class="flex flex-col gap-4 mt-2">
          <div
            v-for="(ticket, index) in effectiveTickets"
            :key="ticket.id"
            @click="
              handleSelectTicket(
                ticket.id ?? '',
                !(
                  (ticket.quota > 0 && ticket.booked >= ticket.quota) ||
                  !isRegistrationOpen ||
                  (now > 0 &&
                    ticket.end_date_time &&
                    now > new Date(ticket.end_date_time).getTime())
                ),
              )
            "
            :class="
              cn(
                'group relative flex w-full rounded-xl transition-all duration-300 cursor-pointer overflow-hidden border shadow-sm',
                getTicketColor(Number(index)).bg,
                ((ticket.quota > 0 && ticket.booked >= ticket.quota) ||
                  !isRegistrationOpen ||
                  (now > 0 &&
                    ticket.end_date_time &&
                    now > new Date(ticket.end_date_time).getTime())) &&
                  'opacity-60 cursor-not-allowed grayscale',
                selectedTicketId === ticket.id &&
                  !(
                    (ticket.quota > 0 && ticket.booked >= ticket.quota) ||
                    !isRegistrationOpen ||
                    (now > 0 &&
                      ticket.end_date_time &&
                      now > new Date(ticket.end_date_time).getTime())
                  )
                  ? `ring-1 scale-[1.01] ${getTicketColor(Number(index)).ring}`
                  : `hover:shadow-md hover:-translate-y-0.5 ${getTicketColor(Number(index)).border}`,
              )
            "
          >
            <div
              class="w-12 sm:w-16 flex flex-col items-center justify-center shrink-0"
            >
              <span
                :class="
                  cn(
                    '-rotate-90 whitespace-nowrap font-semibold tracking-[0.22em] text-[10px] sm:text-xs uppercase opacity-80',
                    getTicketColor(Number(index)).text,
                  )
                "
              >
                TICKET
              </span>
            </div>

            <div
              class="relative w-0 flex flex-col justify-center border-l-2 border-dashed border-white/60"
            >
              <div
                :class="
                  cn(
                    'absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border',
                    getTicketColor(Number(index)).border,
                  )
                "
              />
              <div
                :class="
                  cn(
                    'absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-5 h-5 bg-white rounded-full border',
                    getTicketColor(Number(index)).border,
                  )
                "
              />
            </div>

            <div class="flex-1 p-3.5 flex flex-col justify-between">
              <!-- Ticket Countdown Badge -->
              <template
                v-if="
                  currentTime &&
                  event.status === 'published' &&
                  !(ticket.quota > 0 && ticket.booked >= ticket.quota)
                "
              >
                <div
                  v-if="
                    ticket.start_date_time &&
                    now < new Date(ticket.start_date_time).getTime()
                  "
                  class="mb-2 flex justify-center"
                >
                  <div
                    v-if="
                      new Date(ticket.start_date_time).getTime() - now <
                      1000 * 60 * 60 * 24
                    "
                    class="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-1"
                  >
                    <Flame :size="12" class="animate-bounce text-rose-500" />
                    <span
                      class="text-[10px] font-semibold uppercase tracking-wider text-rose-500"
                      >Dimulai</span
                    >
                    <span
                      class="ml-0.5 animate-pulse font-mono text-[10px] font-bold text-rose-600"
                    >
                      {{
                        pad(
                          getDiffParts(
                            new Date(ticket.start_date_time).getTime() - now,
                          ).hours,
                        )
                      }}:{{
                        pad(
                          getDiffParts(
                            new Date(ticket.start_date_time).getTime() - now,
                          ).minutes,
                        )
                      }}:{{
                        pad(
                          getDiffParts(
                            new Date(ticket.start_date_time).getTime() - now,
                          ).seconds,
                        )
                      }}
                    </span>
                  </div>
                  <div
                    v-else
                    class="flex items-center gap-1.5 rounded-xl border border-primary/15 bg-primary/5 px-2.5 py-1"
                  >
                    <Clock :size="12" class="text-primary" />
                    <span
                      class="text-[10px] font-semibold uppercase tracking-wider text-primary"
                      >Dimulai</span
                    >
                    <div
                      class="ml-0.5 flex items-center gap-0.5 font-mono text-[10px] font-bold text-primary"
                    >
                      <template
                        v-if="
                          getDiffParts(
                            new Date(ticket.start_date_time).getTime() - now,
                          ).days > 0
                        "
                      >
                        <span
                          >{{
                            getDiffParts(
                              new Date(ticket.start_date_time).getTime() - now,
                            ).days
                          }}h</span
                        >
                        <span class="opacity-40">·</span>
                      </template>
                      <span
                        >{{
                          pad(
                            getDiffParts(
                              new Date(ticket.start_date_time).getTime() - now,
                            ).hours,
                          )
                        }}j</span
                      >
                      <span class="opacity-40">:</span>
                      <span
                        >{{
                          pad(
                            getDiffParts(
                              new Date(ticket.start_date_time).getTime() - now,
                            ).minutes,
                          )
                        }}m</span
                      >
                    </div>
                  </div>
                </div>

                <div
                  v-else-if="
                    ticket.end_date_time &&
                    now < new Date(ticket.end_date_time).getTime()
                  "
                  class="mb-2 flex justify-center"
                >
                  <div
                    v-if="
                      new Date(ticket.end_date_time).getTime() - now <
                      1000 * 60 * 60 * 24
                    "
                    class="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-1"
                  >
                    <Flame :size="12" class="animate-bounce text-rose-500" />
                    <span
                      class="text-[10px] font-semibold uppercase tracking-wider text-rose-500"
                      >Berakhir</span
                    >
                    <span
                      class="ml-0.5 animate-pulse font-mono text-[10px] font-bold text-rose-600"
                    >
                      {{
                        pad(
                          getDiffParts(
                            new Date(ticket.end_date_time).getTime() - now,
                          ).hours,
                        )
                      }}:{{
                        pad(
                          getDiffParts(
                            new Date(ticket.end_date_time).getTime() - now,
                          ).minutes,
                        )
                      }}:{{
                        pad(
                          getDiffParts(
                            new Date(ticket.end_date_time).getTime() - now,
                          ).seconds,
                        )
                      }}
                    </span>
                  </div>
                  <div
                    v-else
                    class="flex items-center gap-1.5 rounded-xl border border-primary/15 bg-primary/5 px-2.5 py-1"
                  >
                    <Clock :size="12" class="text-primary" />
                    <span
                      class="text-[10px] font-semibold uppercase tracking-wider text-primary"
                      >Berakhir</span
                    >
                    <div
                      class="ml-0.5 flex items-center gap-0.5 font-mono text-[10px] font-bold text-primary"
                    >
                      <template
                        v-if="
                          getDiffParts(
                            new Date(ticket.end_date_time).getTime() - now,
                          ).days > 0
                        "
                      >
                        <span
                          >{{
                            getDiffParts(
                              new Date(ticket.end_date_time).getTime() - now,
                            ).days
                          }}h</span
                        >
                        <span class="opacity-40">·</span>
                      </template>
                      <span
                        >{{
                          pad(
                            getDiffParts(
                              new Date(ticket.end_date_time).getTime() - now,
                            ).hours,
                          )
                        }}j</span
                      >
                      <span class="opacity-40">:</span>
                      <span
                        >{{
                          pad(
                            getDiffParts(
                              new Date(ticket.end_date_time).getTime() - now,
                            ).minutes,
                          )
                        }}m</span
                      >
                    </div>
                  </div>
                </div>
              </template>

              <!-- Header -->
              <div class="flex justify-between items-start mb-1">
                <h4
                  :class="
                    cn(
                      'font-semibold text-sm leading-snug line-clamp-2',
                      selectedTicketId === ticket.id
                        ? 'text-primary'
                        : 'text-slate-900',
                    )
                  "
                >
                  {{ ticket.name }}
                </h4>
                <span
                  v-if="ticket.quota > 0 && ticket.booked >= ticket.quota"
                  class="bg-danger text-white text-[10px] px-2 py-0.5 rounded-full font-semibold ml-2 shrink-0"
                >
                  Habis
                </span>
              </div>

              <!-- Harga -->
              <p
                class="font-bold text-base md:text-lg text-primary mb-1 leading-tight"
              >
                {{ formatRupiah(ticket.price) }}
              </p>

              <!-- Deskripsi -->
              <p
                v-if="ticket.description"
                class="text-xs text-slate-600 mb-3 line-clamp-2 leading-relaxed"
              >
                {{ ticket.description }}
              </p>

              <!-- Progress Bar -->
              <div
                v-if="ticket.quota > 0"
                class="w-full flex flex-col gap-1 mt-3"
              >
                <div class="w-full flex flex-row items-center gap-3">
                  <div
                    class="relative w-full h-1.5 bg-slate-200 rounded-full overflow-hidden"
                  >
                    <div
                      :class="
                        cn(
                          'h-full rounded-full transition-all duration-500',
                          ticket.booked >= ticket.quota
                            ? 'bg-slate-400'
                            : 'bg-linear-to-r from-primary to-secondary',
                        )
                      "
                      :style="{
                        width: `${Math.min((ticket.booked / ticket.quota) * 100, 100)}%`,
                      }"
                    />
                  </div>
                  <span
                    class="text-[10px] text-muted whitespace-nowrap min-w-fit"
                  >
                    {{ Math.max(0, ticket.quota - ticket.booked) }} tersisa
                  </span>
                </div>
              </div>
              <div v-else class="mt-3 flex items-center gap-2">
                <div class="h-1.5 w-full bg-white/60 rounded-full" />
                <span
                  class="text-[10px] text-slate-500 whitespace-nowrap font-medium"
                  >Tanpa Batas Kuota</span
                >
              </div>
            </div>
          </div>

          <div
            v-if="effectiveTickets.length === 0"
            class="p-4 text-center text-muted text-sm border border-dashed rounded-xl"
          >
            Belum ada tiket tersedia.
          </div>
        </div>
      </div>

      <!-- ZONA BAWAH: SELALU TERLIHAT -->
      <div
        class="shrink-0 p-5 pt-3 flex flex-col gap-3 border-t border-slate-100 bg-white"
      >
        <template v-if="selectedTicket">
          <div
            class="p-3 bg-primary-light rounded-xl flex items-center justify-between border border-primary/10"
          >
            <span class="font-semibold text-sm text-slate-900"
              >Jumlah Tiket</span
            >
            <div
              class="flex items-center gap-3 bg-white px-2 py-1 rounded-xl border border-slate-200"
            >
              <Button
                variant="ghost"
                size="icon"
                @click="qty = Math.max(1, qty - 1)"
                class="h-7 w-7 rounded-full hover:bg-primary text-accent hover:text-white"
                :disabled="qty <= 1"
              >
                <Minus :size="16" />
              </Button>
              <span class="font-semibold w-4 text-center text-sm">{{
                qty
              }}</span>
              <Button
                variant="ghost"
                size="icon"
                @click="if (qty < maxPurchase) qty++;"
                class="h-7 w-7 rounded-full hover:bg-primary text-accent hover:text-white"
                :disabled="qty >= maxPurchase"
              >
                <Plus :size="16" />
              </Button>
            </div>
          </div>
          <p
            v-if="(event.max_ticket_per_user ?? 0) > 0"
            class="text-xs text-muted text-right mt-1 px-1"
          >
            Maksimal pembelian {{ event.max_ticket_per_user }} tiket per user
          </p>
        </template>

        <div class="flex justify-between items-end">
          <span class="text-slate-500 text-sm font-semibold">Total</span>
          <span class="font-bold text-xl md:text-2xl text-primary leading-none">
            {{ selectedTicket ? formatRupiah(totalPrice) : "Rp 0" }}
          </span>
        </div>

        <Button
          as-child
          size="lg"
          class="cursor-pointer w-full py-5 bg-linear-to-r from-primary to-secondary hover:opacity-90 rounded-xl font-semibold text-sm shadow-md shadow-primary/20"
        >
          <NuxtLink to="#">Masuk untuk Membeli Tiket</NuxtLink>
        </Button>

        <Separator />

        <div class="flex items-center justify-between text-slate-500">
          <span class="text-sm font-medium">Bagikan event ini</span>
          <div class="flex gap-2">
            <Button
              @click="handleShare('facebook')"
              variant="outline"
              size="icon"
              class="w-8 h-8 rounded-full bg-muted/10 shadow-xs border-0 hover:bg-slate-200"
            >
              <Globe :size="16" />
            </Button>
            <Button
              @click="handleShare('x')"
              variant="outline"
              size="icon"
              class="w-8 h-8 rounded-full bg-muted/10 shadow-xs border-0 hover:bg-slate-200"
            >
              <X :size="16" />
            </Button>
            <Button
              @click="handleShare('instagram')"
              variant="outline"
              size="icon"
              class="w-8 h-8 rounded-full bg-muted/10 shadow-xs border-0 hover:bg-slate-200"
            >
              <Phone :size="16" />
            </Button>
            <Button
              @click="handleShare('link')"
              variant="outline"
              size="icon"
              class="w-8 h-8 rounded-full bg-muted/10 shadow-xs border-0 hover:bg-muted/20"
            >
              <LinkIcon :size="16" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
