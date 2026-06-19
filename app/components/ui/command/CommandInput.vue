<script setup lang="ts">
import type { ListboxFilterProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Search } from "@lucide/vue"
import { reactiveOmit } from "@vueuse/core"
import { ListboxFilter, useForwardProps } from "reka-ui"
import { cn } from '~/lib/utils'
import { useCommand } from "./context"

defineOptions({ inheritAttrs: false })

const props = defineProps<ListboxFilterProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
const forwardedProps = useForwardProps(delegatedProps)

const { filterState } = useCommand()
</script>

<template>
  <div class="flex items-center border-b border-slate-100 px-3 pb-2 mb-1" cmdk-input-wrapper>
    <Search class="mr-2 h-4 w-4 shrink-0 text-slate-400" />
    <ListboxFilter
      v-bind="{ ...forwardedProps, ...$attrs }"
      v-model="filterState.search"
      auto-focus
      :class="cn('flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900', props.class)"
    />
  </div>
</template>
