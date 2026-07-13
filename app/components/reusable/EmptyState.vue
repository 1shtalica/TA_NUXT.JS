<script setup lang="ts">
import { ArrowRight, Inbox } from "@lucide/vue";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

const props = defineProps<EmptyStateProps>();
const emit = defineEmits(["actionClick"]);
</script>

<template>
  <div class="relative overflow-hidden p-8 md:p-14 text-center">
    <div class="relative z-10 flex flex-col items-center">
      <div
        class="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 shadow-sm ring-1 ring-primary/20"
      >
        <slot name="icon">
          <Inbox
            class="h-10 w-10 text-primary drop-shadow-sm"
            :stroke-width="1.5"
          />
        </slot>
      </div>

      <h3 class="text-lg font-semibold tracking-tight text-accent mb-2">
        {{ title }}
      </h3>

      <p class="text-muted-foreground max-w-sm text-sm leading-relaxed mb-6">
        {{ description }}
      </p>

      <Button
        v-if="actionLabel && actionHref"
        size="lg"
        class="rounded-full shadow-glow font-medium px-8"
        as-child
      >
        <NuxtLink :to="actionHref">
          {{ actionLabel }} <ArrowRight class="ml-2 h-4 w-4" />
        </NuxtLink>
      </Button>
      <Button
        v-else-if="actionLabel"
        size="lg"
        class="rounded-full shadow-glow font-medium px-8"
        @click="emit('actionClick')"
      >
        {{ actionLabel }}
      </Button>
    </div>
  </div>
</template>
