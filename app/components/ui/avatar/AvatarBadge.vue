<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";
const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>
<template>
  <span
    data-slot="avatar-badge"
    :class="
      cn(
        'bg-primary text-primary-foreground ring-background absolute right-0 bottom-0 z-10 flex size-3 items-center justify-center rounded-full ring-2',
        props.class,
      )
    "
    ><slot
  /></span>
</template>
