<script setup lang="ts">
import { Check, ChevronsUpDown, ArrowUpDown } from "lucide-vue-next";
import { cn } from "~/lib/utils";

const sortMethods = [
  { value: "newest", label: "Terbaru" },
  { value: "closest", label: "Terdekat" },
  { value: "lowest_price", label: "Harga Terendah" },
  { value: "highest_price", label: "Harga Tertinggi" },
];

const normalizeSortValue = (value: string) => {
  const legacySortMap: Record<string, string> = {
    Terbaru: "newest",
    terbaru: "newest",
    Terdekat: "closest",
    terdekat: "closest",
    Harga_Terendah: "lowest_price",
    harga_terendah: "lowest_price",
    Harga_Tertinggi: "highest_price",
    harga_tertinggi: "highest_price",
  };
  return legacySortMap[value] ?? value;
};

const open = ref(false);
const route = useRoute();
const router = useRouter();

const currentSort = computed(() =>
  normalizeSortValue((route.query.sort as string) || "newest"),
);
const currentLabel = computed(
  () =>
    sortMethods.find((s) => s.value === currentSort.value)?.label || "Terbaru",
);

const onSelectSort = (value: string) => {
  const query = { ...route.query };

  if (value === "newest") {
    delete query.sort;
  } else {
    query.sort = value;
  }

  delete query.page;
  delete query.offset;

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
            <ArrowUpDown class="h-4 w-4 text-primary" />
          </div>
          <div class="flex flex-col items-start min-w-0 flex-1 text-left">
            <span class="text-xs text-slate-400 font-medium shrink-0"
              >Urutkan</span
            >
            <TooltipProvider>
              <Tooltip :delayDuration="300">
                <TooltipTrigger as-child>
                  <span
                    class="text-sm font-semibold text-slate-900 truncate w-full mt-0.5 cursor-pointer"
                  >
                    {{ currentLabel }}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="start">
                  {{ currentLabel }}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 text-slate-300" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-50 p-0" align="start">
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="method in sortMethods"
              :key="method.value"
              :value="method.value"
              @select="onSelectSort(method.value)"
            >
              <Check
                :class="
                  cn(
                    'mr-2 h-4 w-4',
                    currentSort === method.value ? 'opacity-100' : 'opacity-0',
                  )
                "
              />
              {{ method.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
