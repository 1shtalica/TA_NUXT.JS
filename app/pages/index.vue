<script setup lang="ts">
useSeoMeta({
  title: "Kumpul.in",
  description: "Kumpulin event management system",
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
