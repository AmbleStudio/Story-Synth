<template>
  <div class="container">
    <div class="row mb-4 padding-after-navbar">
      <div class="col-sm text-center">
        <h1 class="mb-3">Welcome to Play.Amble</h1>
        <p>
          Play.Amble is a gaming platform that hosts some of Amble's digital
          games.
        </p>
        <p>
          It is based on the
          <a href="http://storysynth.org">Story Synth</a> open source software
          platform, which you can use to make your own story games.
        </p>
        <p>
          Explore selected Amble games below, or visit our main site at
          <a href="http://amble.studio">Amble.Studio</a> to learn more.
        </p>
      </div>
    </div>

    <div class="row">
      <div
        class="col-xl-8 offset-xl-2 offset-lg-0 col-lg-12 col-md-4 mb-1"
        v-for="(game, key) in gameList"
        v-bind:key="key"
      >
        <div class="card shadow mb-2">
          <div class="row no-gutters">
            <div class="col-lg-4">
              <a v-bind:href="game.link">
                <img
                  class="card-img"
                  v-bind:src="game.image"
                  v-bind:alt="game.title + ' logo'"
                />
              </a>
            </div>
            <div class="col-lg-8">
              <div class="card-body d-flex flex-column h-100">
                <h5 class="card-title">{{ game.title }}</h5>
                <h6 class="card-subtitle text-muted mb-2">
                  {{ game.credits }}
                </h6>
                <div class="card-text">{{ game.blurb }}</div>
                <b-button
                  v-bind:href="game.link"
                  class="mt-auto align-self-end stretched-link"
                  >Play</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-gallery",
  data: function () {
    return {
      gameList: [
        {
          title: "Green Hollow",
          credits: "By Amble Studio",
          blurb:
            "A gameful team-building exercise set in an ancient village thousands of years ago.",
          link: "/Games/Green-Hollow/",
          image:
            "https://amble.studio/wp-content/uploads/2021/09/Green-Hollow-Rectangle.png",
        },
        {
          title: "Umberdred Institute for Emerging Evildoers",
          credits: "By Amble Studio",
          blurb:
            "Tell silly stories about how aspiring villains accept unlikely quests to earn dubious certifications in evildoing skills.",
          link: "/Games/Umberdred-Institute/",
          image:
            "https://img.itch.zone/aW1nLzY3NzQzNTIuanBn/315x250%23c/XQicpj.jpg",
        },

        /*{
          title: 'TK',
          credits: 'TK',
          blurb: 'TK',
          link: 'TK',
          image: 'TK'
        },
        {
          title: 'TK',
          credits: 'TK',
          blurb: 'TK',
          link: 'TK',
          image: 'TK'
        },*/
      ],
    };
  },
  metaInfo() {
    return {
      title: "Gallery of Story Synth Games",
      meta: [
        {
          property: "description",
          content: "Check out the top games you can play with Story Synth",
          vmid: "description",
        },
        {
          property: "og:title",
          content: "Story Synth Gallery",
          vmid: "og:title",
        },
        {
          property: "og:description",
          content: "Check out the top games you can play with Story Synth",
          vmid: "og:description",
        },
        {
          property: "og:image",
          content:
            "https://diegeticgames.com/uploads/gallery-collage-unfurl.png",
          vmid: "og:image",
        },
        {
          property: "og:url",
          content: "https://storysynth.org/" + this.$route.fullPath,
          vmid: "og:url",
        },
        {
          property: "twitter:card",
          content: "summary",
          vmid: "twitter:card",
        },
        {
          property: "og:site_name",
          content: "Story Synth",
          vmid: "og:site_name",
        },
        {
          property: "twitter:image:alt",
          content: "The logos of several games in the Story Synth Gallery",
          vmid: "twitter:image:alt",
        },
      ],
    };
  },
  mounted() {
    let body = document.getElementById("app"); // document.body;
    body.classList.remove(body.classList[0]);
    body.classList.add("style-template-homepage");

    document.dispatchEvent(new Event("x-app-rendered"));
    if (location.hostname.toString() !== "localhost") {
      this.$mixpanel.track("Visited Gallery");
    }
  },
};
</script>

<style scoped></style>
