<script setup lang="ts">
import { Check, ChevronsUpDown, Tag, LoaderCircle } from "@lucide/vue";
import { cn } from "~/lib/utils";
import { APPROVED_EVENT_CATEGORIES } from "~/constants/event-categories";
import { EventService } from "~/services/event-service";

const open = ref(false);
const dynamicCategories = ref<string[]>([...APPROVED_EVENT_CATEGORIES]);
const loading = ref(false);

const route = useRoute();
const router = useRouter();

const currentCategory = computed(
  () => route.query.category as string | undefined,
);
const displayLabel = computed(() => currentCategory.value || "Semua");

onMounted(async () => {
  loading.value = true;
  const normalized = await EventService.getEventCategories($fetch);
  if (normalized.length > 0) {
    dynamicCategories.value = normalized;
  }
  loading.value = false;
});

const onSelectCategory = (currentValue: string) => {
  const query = { ...route.query };

  if (currentValue === currentCategory.value) {
    delete query.category;
  } else {
    query.category = currentValue;
  }

  delete query.offset;
  delete query.page;

  router.push({ query });
  open.value = false;
};
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="ghost"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between h-auto py-2.5 lg:py-3 px-3 lg:px-5 bg-transparent hover:bg-slate-50 rounded-xl lg:rounded-full border-0 shadow-none transition-colors min-w-0"
      >
        <div class="flex items-center gap-3 w-full min-w-0">
          <div
            class="hidden sm:flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center shrink-0"
          >
            <Tag class="h-4 w-4 text-primary" />
          </div>
          <div class="flex flex-col items-start min-w-0 flex-1 text-left">
            <span class="text-xs text-slate-400 font-medium shrink-0"
              >Kategori</span
            >
            <TooltipProvider>
              <Tooltip :delayDuration="300">
                <TooltipTrigger as-child>
                  <span
                    class="text-sm font-semibold text-slate-900 truncate w-full mt-0.5 cursor-pointer"
                  >
                    {{ displayLabel }}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="start">
                  {{ displayLabel }}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <LoaderCircle
          v-if="loading"
          class="ml-2 h-4 w-4 shrink-0 animate-spin text-slate-300"
        />
        <ChevronsUpDown v-else class="ml-2 h-4 w-4 shrink-0 text-slate-300" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-70 p-0" align="start">
      <Command>
        <CommandInput placeholder="Cari kategori..." />
        <CommandList>
          <CommandEmpty>{{
            loading ? "Memuat..." : "Kategori tidak ditemukan."
          }}</CommandEmpty>
          <CommandGroup v-if="!loading">
            <CommandItem
              v-for="catString in dynamicCategories"
              :key="catString"
              :value="catString"
              @select="onSelectCategory(catString)"
            >
              <Check
                :class="
                  cn(
                    'mr-2 h-4 w-4',
                    currentCategory === catString ? 'opacity-100' : 'opacity-0',
                  )
                "
              />
              {{ catString }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
