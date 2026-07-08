<template>
  <div class="page">
    <AppHeader />
    <main class="main">
      <HeroSection />
      <div class="sections">
        <AboutSection />
        <SkillsSection />
        <ServiceSection />
        <WorksSection />
        <CareerSection />
        <ContactSection />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.page {
  background:
    radial-gradient(circle, #e0e0e0 1px, transparent 1px);
  background-size: 24px 24px;
  background-color: var(--color-bg);
  min-height: 100vh;
  font-family: var(--font-sans);
  color: var(--color-text);
}

.main {
  padding-top: var(--header-height);
}

.sections {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 80px;
}

@media (max-width: 768px) {
  .sections {
    padding: 0 20px;
  }
}
</style>
