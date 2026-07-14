<script setup lang="ts">
import type { ListboxItemEmits, ListboxItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit, useCurrentElement } from "@vueuse/core"
import { ListboxItem, useForwardPropsEmits, useId } from "reka-ui"
import { computed, onMounted, onUnmounted, ref } from "vue"
import { cn } from '~/lib/utils'
import { useCommand, useCommandGroup } from "./context"

const props = defineProps<ListboxItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<ListboxItemEmits>()

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardPropsEmits(delegatedProps, emits)

const id = useId()
const { filterState, allItems, allGroups } = useCommand()
const groupContext = useCommandGroup()

const isRender = computed(() => {
  if (!filterState.search) return true
  const filteredCurrentItem = filterState.filtered.items.get(id)
  if (filteredCurrentItem === undefined) return true
  return filteredCurrentItem > 0
})

const itemRef = ref()
const currentElement = useCurrentElement(itemRef)
onMounted(() => {
  if (!(currentElement.value instanceof HTMLElement)) return
  allItems.value.set(id, currentElement.value.textContent ?? (props.value?.toString() ?? ""))
  const groupId = groupContext?.id
  if (groupId) {
    if (!allGroups.value.has(groupId)) allGroups.value.set(groupId, new Set([id]))
    else allGroups.value.get(groupId)?.add(id)
  }
})
onUnmounted(() => {
  allItems.value.delete(id)
})
</script>

<template>
  <ListboxItem
    v-if="isRender"
    v-bind="forwarded"
    :id="id"
    ref="itemRef"
    :class="cn('relative flex cursor-default select-none items-center rounded-xl px-3 py-2 text-sm text-slate-700 outline-none data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors', props.class)"
    @select="() => { filterState.search = '' }"
  >
    <slot />
  </ListboxItem>
</template>
