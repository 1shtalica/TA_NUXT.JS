<script setup lang="ts">
import { Menu, Home } from "lucide-vue-next";
import { cn } from "~/lib/utils";

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const router = useRouter();
const route = useRoute();

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const getNavLinkClass = (path: string) => {
  const isActive =
    path !== "/"
      ? route.path.slice(0, path.length) === path
      : route.path === path;
  return cn(
    "rounded-full px-5 py-2 transition-all duration-300 relative font-semibold text-sm h-9",
    isActive
      ? "bg-primary/10 text-primary"
      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
  );
};
</script>

<template>
  <nav
    :class="
      cn(
        'fixed top-0 z-50 w-full transition-all duration-300 ease-in-out py-3 md:py-4',
        'border-b backdrop-blur-xl',
        isScrolled
          ? 'bg-white/85 border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
          : 'bg-white border-white/40 shadow-none',
      )
    "
  >
    <div
      class="container relative mx-auto px-4 md:px-8 lg:px-12 flex flex-row items-center justify-between w-full max-w-7xl"
    >
      <div class="flex items-center gap-2">
        <div class="md:hidden">
          <Sheet v-model:open="isMobileMenuOpen">
            <SheetTrigger as-child>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu class="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              class="w-64 flex flex-col gap-0"
            >
              <SheetHeader
                class="h-16 flex flex-row items-center border-b shrink-0 p-0"
              >
                <SheetTitle class="flex-1 px-4">
                  <button
                    type="button"
                    class="flex items-center gap-2 text-xl group cursor-pointer focus-visible:outline-none"
                    @click="
                      () => {
                        isMobileMenuOpen = false;
                        router.go(0);
                      }
                    "
                  >
                    <span class="transition-transform group-hover:rotate-12"
                      >🎉</span
                    >
                    <span
                      class="font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary"
                      >kumpul.in</span
                    >
                  </button>
                </SheetTitle>
              </SheetHeader>

              <div class="flex-1 flex flex-col overflow-hidden p-3 gap-3">
                <nav class="flex flex-col gap-2">
                  <Button
                    as-child
                    variant="ghost"
                    :class="
                      cn(
                        'w-full justify-start h-10',
                        route.path === '/'
                          ? 'bg-primary/10 text-primary font-bold hover:bg-primary/20'
                          : 'text-muted font-medium',
                      )
                    "
                    @click="isMobileMenuOpen = false"
                  >
                    <NuxtLink to="/">
                      <Home class="h-5 w-5 shrink-0 mr-3" />
                      <span>Beranda</span>
                    </NuxtLink>
                  </Button>

                  <Button
                    as-child
                    variant="ghost"
                    :class="
                      cn(
                        'w-full justify-start h-10',
                        route.path === '/events'
                          ? 'bg-primary/10 text-primary font-bold hover:bg-primary/20'
                          : 'text-muted font-medium',
                      )
                    "
                    @click="isMobileMenuOpen = false"
                  >
                    <NuxtLink to="/events">
                      <span>Jelajah</span>
                    </NuxtLink>
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <button
          type="button"
          @click="router.go(0)"
          class="hidden md:flex items-center gap-2 md:text-2xl group cursor-pointer focus-visible:outline-none"
        >
          <span class="transition-transform group-hover:rotate-12">🎉</span>
          <span
            class="font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary"
          >
            kumpul.in
          </span>
        </button>
      </div>

      <div
        class="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2"
      >
        <Button as-child variant="ghost" size="sm" :class="getNavLinkClass('/')">
          <NuxtLink to="/">Beranda</NuxtLink>
        </Button>

        <Button
          as-child
          variant="ghost"
          size="sm"
          :class="getNavLinkClass('/events')"
        >
          <NuxtLink to="/events">Jelajah</NuxtLink>
        </Button>
      </div>

      <div class="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          class="rounded-full font-bold h-9 bg-white hover:bg-slate-100 border border-slate-200 shadow-sm"
          as-child
        >
          <NuxtLink to="#">Masuk</NuxtLink>
        </Button>
        <Button
          variant="brand"
          size="sm"
          as-child
          class="hidden md:inline-flex rounded-full font-bold h-9 shadow-[0_4px_14px_0_rgb(0,44,238,0.39)] hover:shadow-[0_6px_20px_rgba(0,44,238,0.23)] hover:-translate-y-0.5 transition-all"
        >
          <NuxtLink to="#">Daftar</NuxtLink>
        </Button>
      </div>
    </div>
  </nav>
</template>
