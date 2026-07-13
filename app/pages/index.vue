<script setup lang="ts">
const { origin } = useRequestURL();

useSeoMeta({
  title: "Kumpul.in — Platform Event & Manajemen Acara Terlengkap",
  description: "Temukan, ikuti, dan kelola berbagai acara seru, konser, workshop, dan seminar di sekitarmu dengan Kumpulin.",
  ogTitle: "Kumpul.in — Platform Event & Manajemen Acara Terlengkap",
  ogDescription: "Temukan, ikuti, dan kelola berbagai acara seru, konser, workshop, dan seminar di sekitarmu dengan Kumpulin.",
  ogUrl: () => `${origin}/`,
  ogType: "website",
  ogImage: [
    {
      url: `${origin}/og_image.png`,
      width: 1200,
      height: 630,
      alt: "Banner Resmi Kumpul.in",
      type: "image/png",
    },
  ],
});

useHead({
  link: [{ rel: "canonical", href: `${origin}/` }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Kumpul.in",
        url: `${origin}/`,
        potentialAction: {
          "@type": "SearchAction",
          target: `${origin}/events?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }),
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Kumpul.in",
        url: `${origin}/`,
        description: "Platform manajemen acara dan tiket online di Indonesia.",
      }),
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
