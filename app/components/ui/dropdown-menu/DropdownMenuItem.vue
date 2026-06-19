<script setup lang="ts">
import type { DropdownMenuItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DropdownMenuItem, useForwardProps } from "reka-ui"
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<DropdownMenuItemProps & { class?: HTMLAttributes["class"], inset?: boolean, variant?: "default" | "destructive" }>(), {
  variant: "default",
})

const delegatedProps = reactiveOmit(props, "inset", "variant", "class")
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="cn(
      'relative flex cursor-default select-none items-center rounded-xl px-2 py-1.5 text-sm outline-none transition-colors focus:bg-primary/10 focus:text-primary focus:font-medium text-slate-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      props.class,
    )"
  >
    <slot />
  </DropdownMenuItem>
</template>
