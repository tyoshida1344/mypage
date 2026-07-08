<template>
  <div class="page">
    <div class="container">
      <AppHeader />
      <main>
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
  </div>
</template>

<style scoped>
.page {
  background: var(--color-bg);
  min-height: 100vh;
  padding: 56px 24px;
  font-family: var(--font-sans);
  color: var(--color-text);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background: var(--color-surface);
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  overflow: hidden;
}

.sections {
  padding: 0 80px;
  border-top: 1px solid var(--color-border);
}

@media (max-width: 768px) {
  .page {
    padding: 0;
  }

  .container {
    border-radius: 0;
    box-shadow: none;
  }

  .sections {
    padding: 0 20px;
  }
}
</style>
