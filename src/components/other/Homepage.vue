<template>
  <div class="homepage">
    <div class="container">
      <div
        v-if="!$route.params.gameType"
        class="card shadow mb-4"
        style="margin-top: 76px"
      >
        <div class="card-body">
          <div id="homepage-intro-text" v-if="!$route.params.gSheetID">
            <div class="row mb-4">
              <div class="col-sm text-center">
                <!-- <h3>Make, play, and share storytelling games</h3> -->
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-sm text-left">
                <p>
                  Just like
                  <a href="http://storysynth.org">Story Synth</a>, you can use
                  Play.Amble to try making your own games.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-gameMaker
      v-if="!launcherOnHomepage"
      :routeRoomID="$route.params.roomID"
      :routeGSheetID="$route.params.gSheetID"
      :routeGameType="$route.params.gameType"
    ></app-gameMaker>
  </div>
</template>

<script>
import GameMaker from "../launchers/GameMaker.vue";

export default {
  name: "app-homepage",
  components: {
    "app-gameMaker": GameMaker,
  },
  props: {
    routeGameType: String,
    routeGSheetID: String,
    routeRoomID: String,
  },
  data() {
    return {
      launcherOnHomepage: false, // if you want the game launcher on the homepage, add in the route up until the roomID e.g. "/Games/Around-The-Realm/"
    };
  },
  mounted() {
    let body = document.getElementById("app"); // document.body;
    body.classList.remove(body.classList[0]);
    body.classList.add("style-template-homepage");

    body = document.getElementsByClassName("non-footer-content")[0];
    if (body.classList.length > 0) {
      body.classList.remove(body.classList[1]);
    }

    document.dispatchEvent(new Event("x-app-rendered"));
  },
};
</script>

<style scoped>
.homepage {
  max-width: 800px;
  margin: auto;
}

li {
  list-style-type: disc;
  display: list-item;
  margin-left: 20px;
}
</style>