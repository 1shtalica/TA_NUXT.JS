<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "~/lib/utils";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
  type?: string;
}>();
const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();
const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <div v-if="$slots.startIcon || $slots.endIcon" class="relative w-full">
    <div
      v-if="$slots.startIcon"
      class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground select-none pointer-events-none"
    >
      <slot name="startIcon" />
    </div>
    <input
      v-model="modelValue"
      :type="props.type"
      data-slot="input"
      :class="
        cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-xl border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'shadow-none py-5 rounded-xl bg-gray-50',
          $slots.startIcon && 'pl-10',
          $slots.endIcon && 'pr-10',
          props.class,
        )
      "
    />
    <div
      v-if="$slots.endIcon"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground select-none pointer-events-none"
    >
      <slot name="endIcon" />
    </div>
  </div>
  <input
    v-else
    v-model="modelValue"
    :type="props.type"
    data-slot="input"
    :class="
      cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-xl border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'shadow-none py-5 rounded-xl bg-gray-50',
        props.class,
      )
    "
  />
</template>
