<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from "@lucide/vue";
import { Toaster as Sonner } from "vue-sonner";
import { cn } from "~/lib/utils";
const props = defineProps<ToasterProps>();
</script>

<template>
  <Sonner
    :class="cn('toaster group', props.class)"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--border-radius': 'var(--radius)',
    }"
    v-bind="props"
    closeButton
    :gap="10"
    :offset="16"
    :visibleToasts="4"
    :toastOptions="{
      classes: {
        toast:
          'group toast group-[.toaster]:min-h-14 group-[.toaster]:rounded-xl group-[.toaster]:border group-[.toaster]:px-4 group-[.toaster]:py-3 group-[.toaster]:shadow-xl group-[.toaster]:shadow-slate-950/10 group-[.toaster]:backdrop-blur-md group-[.toaster]:tracking-normal',
        default:
          'group-[.toaster]:border-border group-[.toaster]:bg-background/95 group-[.toaster]:text-foreground',
        success:
          'group-[.toaster]:border-success/25 group-[.toaster]:bg-success-light/95 group-[.toaster]:text-slate-950',
        error:
          'group-[.toaster]:border-danger/25 group-[.toaster]:bg-danger-light/95 group-[.toaster]:text-slate-950',
        warning:
          'group-[.toaster]:border-warning/30 group-[.toaster]:bg-warning-light/95 group-[.toaster]:text-slate-950',
        info: 'group-[.toaster]:border-info/25 group-[.toaster]:bg-info-light/95 group-[.toaster]:text-slate-950',
        loading:
          'group-[.toaster]:border-border group-[.toaster]:bg-background/95 group-[.toaster]:text-foreground',
        title:
          'group-[.toast]:text-sm group-[.toast]:font-semibold group-[.toast]:leading-5 group-[.toast]:tracking-normal',
        description:
          'group-[.toast]:mt-1 group-[.toast]:text-xs group-[.toast]:leading-relaxed group-[.toast]:text-muted-foreground group-[.toast]:tracking-normal',
        icon: 'group-[.toast]:mt-0.5 group-[.toast]:flex group-[.toast]:size-7 group-[.toast]:items-center group-[.toast]:justify-center group-[.toast]:rounded-full group-[.toast]:bg-white/70 group-[.toast]:shadow-sm group-[.toast]:shadow-slate-950/5',
        closeButton:
          'group-[.toast]:border-border group-[.toast]:bg-white/90 group-[.toast]:text-slate-500 group-[.toast]:shadow-sm group-[.toast]:transition-colors group-[.toast]:hover:bg-white group-[.toast]:hover:text-slate-950',
        actionButton:
          'group-[.toast]:h-8 group-[.toast]:rounded-lg group-[.toast]:bg-primary group-[.toast]:px-3 group-[.toast]:text-xs group-[.toast]:font-semibold group-[.toast]:text-primary-foreground',
        cancelButton:
          'group-[.toast]:h-8 group-[.toast]:rounded-lg group-[.toast]:bg-white/80 group-[.toast]:px-3 group-[.toast]:text-xs group-[.toast]:font-semibold group-[.toast]:text-slate-600 group-[.toast]:hover:bg-white',
      },
    }"
  >
    <template #success-icon
      ><CircleCheckIcon class="size-4 text-success"
    /></template>
    <template #info-icon><InfoIcon class="size-4 text-info" /></template>
    <template #warning-icon
      ><TriangleAlertIcon class="size-4 text-warning"
    /></template>
    <template #error-icon><OctagonXIcon class="size-4 text-danger" /></template>
    <template #loading-icon
      ><div>
        <Loader2Icon class="size-4 animate-spin text-muted-foreground" /></div
    ></template>
    <template #close-icon><XIcon class="size-4" /></template>
  </Sonner>
</template>
