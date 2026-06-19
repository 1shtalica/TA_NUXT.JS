<script setup lang="ts">
import { cn } from "@/lib/utils";

withDefaults(defineProps<{ variant?: "vertical" | "horizontal" }>(), {
  variant: "vertical",
});
</script>

<template>
  <Card
    :class="
      cn(
        'h-full flex overflow-hidden rounded-3xl bg-white border shadow-sm',
        variant === 'horizontal' ? 'flex-row h-55' : 'flex-col',
      )
    "
  >
    <Skeleton
      :class="
        cn(
          'shrink-0 rounded-none',
          variant === 'horizontal' ? 'w-65 h-full' : 'w-full aspect-video',
        )
      "
    />
    <CardContent class="flex flex-col p-4 sm:p-5 h-full relative">
      <div class="flex gap-4 items-start">
        <Skeleton class="w-14 h-17 rounded-2xl shrink-0" />
        <div class="flex flex-col gap-2 w-full pt-1">
          <Skeleton class="h-3 w-1/3" />
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-4/5" />
          <div class="flex items-center gap-1.5 mt-2">
            <Skeleton class="h-3 w-3 rounded-full" />
            <Skeleton class="h-3 w-1/2" />
          </div>
          <Skeleton class="h-2 w-1/3 mt-2" />
        </div>
      </div>
      <div class="mt-auto pt-6 flex items-end justify-between">
        <div class="flex flex-col gap-1">
          <Skeleton class="h-4 w-20" />
        </div>
        <div class="flex items-center gap-1.5">
          <Skeleton class="h-4 w-12" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
