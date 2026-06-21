<script setup lang="ts">
const { origin } = useRequestURL();

useSeoMeta({
  title: "Kumpul.in",
  description: "Kumpulin event management system",
});

useHead({
  link: [{ rel: "canonical", href: `${origin}/` }],
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
