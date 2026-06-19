<script setup lang="ts">
useHead({
  title: "Kumpul.in — Temukan & Kelola Event Terbaik",
  meta: [
    {
      name: "description",
      content:
        "Platform manajemen event terlengkap untuk menemukan dan mengelola acara.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <LandingNavbar />
    <main>
      <Hero />
      <EventsSuggestion />
      <PopularCategory />
      <UpComingEvents />
      <CallToAction />
    </main>
    <LandingFooter />
    <GoToTopButton />
  </div>
</template>
