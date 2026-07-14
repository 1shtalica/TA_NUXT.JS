<template>
  <div class="pt-16 md:pt-18">
    <div class="relative z-10 py-5 md:py-7">
      <div class="container mx-auto px-4 md:px-8 lg:px-12 w-full max-w-7xl">
        <Skeleton class="w-full h-54 sm:h-76 md:h-96 lg:h-108 xl:h-120 max-h-120 rounded-2xl" />
      </div>
    </div>

    <div class="container mx-auto px-4 md:px-8 lg:px-12 w-full max-w-7xl pb-14 md:pb-18 relative z-20">
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-5 lg:gap-6">
        <div class="xl:col-span-8">
          <div class="w-full h-fit p-5 sm:p-6 lg:p-7 bg-white shadow-md shadow-slate-900/5 border border-slate-200/80 rounded-2xl">
            <div class="flex flex-col gap-5 md:gap-6">
              <div class="flex flex-wrap items-center gap-2">
                <Skeleton class="h-5 w-20 rounded-full" />
                <Skeleton class="h-5 w-16 rounded-full" />
                <Skeleton class="h-5 w-24 rounded-full" />
              </div>

              <Skeleton class="h-9 w-4/5" />

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <Skeleton v-for="i in 4" :key="i" class="h-20 rounded-xl" />
              </div>

              <Skeleton class="h-px w-full" />

              <Skeleton class="h-20 w-full rounded-2xl" />

              <div class="flex flex-col gap-2 pt-2">
                <Skeleton class="h-6 w-40" />
                <Skeleton class="h-4 w-full" />
                <Skeleton class="h-4 w-full" />
                <Skeleton class="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>

        <div class="xl:col-span-4 relative">
          <div class="sticky top-24">
            <div class="w-full bg-white shadow-md shadow-slate-900/5 border border-slate-200/80 rounded-2xl flex flex-col overflow-hidden">
              <div class="p-5 pb-2 flex flex-col gap-4">
                <Skeleton class="h-3 w-20" />
                <Skeleton class="h-7 w-32" />
              </div>
              <div class="px-5 pb-4 flex flex-col gap-4">
                <Skeleton v-for="i in 2" :key="i" class="h-24 w-full rounded-xl" />
              </div>
              <div class="p-5 pt-3 flex flex-col gap-3 border-t border-slate-100">
                <Skeleton class="h-10 w-full rounded-xl" />
                <Skeleton class="h-12 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
