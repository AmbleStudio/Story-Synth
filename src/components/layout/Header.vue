<template>
  <b-navbar
    toggleable="md"
    type="dark"
    variant="dark"
    fixed="top"
    v-if="!$route.params.roomID"
    :class="{ 'shadow scrolledNavbar': scrollPosition > 100 }"
  >
<<<<<<< Updated upstream
    <b-navbar-brand href="/">Play.Amble</b-navbar-brand>
=======
    <b-navbar-brand href="/">Story Synth</b-navbar-brand>
>>>>>>> Stashed changes
    <b-navbar-toggle
      target="navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
    </b-navbar-toggle>

    <b-collapse id="navbarSupportedContent" is-nav>
      <b-navbar-nav>
<<<<<<< Updated upstream
        <b-nav-item href="https://amble.studio"
          >Back to Amble.Studio</b-nav-item
        >
=======
        <b-nav-item href="https://docs.storysynth.org/guide">About</b-nav-item>
        <b-nav-item href="/Gallery/">Gallery</b-nav-item>
        <b-nav-item href="/Upload/">Upload</b-nav-item>
        <b-nav-item href="https://docs.storysynth.org/guide/design.html"
          >Guide</b-nav-item
        >
        <b-nav-item href="https://docs.storysynth.org/press/">Press</b-nav-item>
>>>>>>> Stashed changes
      </b-navbar-nav>
    </b-collapse>
    <div>Login</div>
  </b-navbar>
</template>

<script>
export default {
  name: "app-header",
  data() {
    return {
      scrollPosition: null,
    };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  destroy() {
    window.removeEventListener("scroll", this.updateScroll);
  },
};
<<<<<<< Updated upstream
</script>
=======
</script>
>>>>>>> Stashed changes
