<script setup lang="ts">
import { Check, ChevronsUpDown, Ticket } from "@lucide/vue";
import { cn } from "~/lib/utils";

const priceOptions = [
  { value: "semua_harga", label: "Semua Harga" },
  { value: "free", label: "Gratis" },
  { value: "paid", label: "Berbayar" },
];

const open = ref(false);
const route = useRoute();
const router = useRouter();

const currentPrice = computed(
  () => (route.query.price as string) || "semua_harga",
);

const normalizedCurrentPrice = computed(() => {
  return currentPrice.value === "gratis"
    ? "free"
    : currentPrice.value === "berbayar"
      ? "paid"
      : currentPrice.value;
});

const currentLabel = computed(() => {
  return (
    priceOptions.find((p) => p.value === normalizedCurrentPrice.value)?.label ||
    "Semua Harga"
  );
});

const onSelectPrice = (selectedValue: string) => {
  const query = { ...route.query };

  if (selectedValue === "semua_harga") {
    delete query.price;
  } else {
    query.price = selectedValue;
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
            <Ticket class="h-4 w-4 text-primary" />
          </div>
          <div class="flex flex-col items-start min-w-0 flex-1 text-left">
            <span class="text-xs text-slate-400 font-medium shrink-0"
              >Harga</span
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
              v-for="option in priceOptions"
              :key="option.value"
              :value="option.value"
              @select="onSelectPrice(option.value)"
            >
              <Check
                :class="
                  cn(
                    'mr-2 h-4 w-4',
                    normalizedCurrentPrice === option.value
                      ? 'opacity-100'
                      : 'opacity-0',
                  )
                "
              />
              {{ option.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
