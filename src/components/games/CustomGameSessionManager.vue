<template>
  <div class="">
    <app-greenHollow
      :roomID="$route.params.roomID"
      v-if="routeGSheetID == 'Green-Hollow'"
      :userRole="$route.params.userRole"
    ></app-greenHollow>
    <app-greenHollowTest
      :roomID="$route.params.roomID"
      v-if="routeGSheetID == 'Green-Hollow-Test'"
      :userRole="$route.params.userRole"
    ></app-greenHollowTest>
    <app-officeHeroes
      :roomID="$route.params.roomID"
      v-if="routeGSheetID == 'Office-Heroes'"
      :userRole="$route.params.userRole"
    ></app-officeHeroes>
    <app-arribaTown
      :roomID="$route.params.roomID"
      v-if="routeGSheetID == 'Arriba-Town'"
      :userRole="$route.params.userRole"
    ></app-arribaTown>
    <app-arribaTownTest
      :roomID="$route.params.roomID"
      v-if="routeGSheetID == 'Arriba-Town-Test'"
      :userRole="$route.params.userRole"
    ></app-arribaTownTest>
    <app-umberdredInstitute
      :roomID="$route.params.roomID"
      v-if="routeGSheetID == 'Umberdred-Institute'"
    ></app-umberdredInstitute>
  </div>
</template>

<script>
import GreenHollow from "./GreenHollow.vue";
import GreenHollowTest from "./GreenHollowTest.vue";
import OfficeHeroes from "./OfficeHeroes.vue";
import ArribaTown from "./ArribaTown.vue";
import ArribaTownTest from "./ArribaTownTest.vue";
import UmberdredInstitute from "./UmberdredInstitute.vue";

export default {
  name: "app-customGameSession",
  components: {
    "app-greenHollow": GreenHollow,
    "app-greenHollowTest": GreenHollowTest,
    "app-officeHeroes": OfficeHeroes,
    "app-arribaTown": ArribaTown,
    "app-arribaTownTest": ArribaTownTest,
    "app-umberdredInstitute": UmberdredInstitute,
  },
  props: {
    routeGSheetID: String,
    routeUserRole: String,
  },
  data: function () {
    return {
      gameMetaData: {
        "Green-Hollow": {
          gameTitle: "Green Hollow",
          gameBlurb:
            "A gameful team-building exercise set in an ancient village thousands of years ago.",
          ogImage:
            "https://amble.studio/wp-content/uploads/2021/09/Green-Hollow-Square-Bw.png",
        },
        "Green-Hollow-Test": {
          gameTitle: "Green Hollow [TEST]",
          gameBlurb:
            "[TEST VERSION] A gameful team-building exercise set in an ancient village thousands of years ago.",
          ogImage:
            "https://amble.studio/wp-content/uploads/2021/09/Green-Hollow-Square-Bw.png",
        },
        "Green-Hollow-New": {
          gameTitle: "Green Hollow [UPDATES]",
          gameBlurb:
            "[UPDATES] A gameful team-building exercise set in an ancient village thousands of years ago.",
          ogImage:
            "https://amble.studio/wp-content/uploads/2021/09/Green-Hollow-Square-Bw.png",
        },
        "Office-Heroes": {
          gameTitle: "Office Heroes",
          gameBlurb:
            "[In development] A game of superheroes with wild, office-based powers.",
          ogImage:
            "https://amble.studio/wp-content/uploads/2021/10/Office-Heroes-Square.png",
        },
        "Arriba-Town": {
          gameTitle: "Arriba Town",
          gameBlurb:
            "A tiny quest to find your path and change your village for the better.",
          ogImage:
            "https://amble.studio/wp-content/uploads/2021/12/Arriba-Town-Rectangle-1.png",
        },
        "Arriba-Town-Test": {
          gameTitle: "Arriba Town",
          gameBlurb:
            "[TEST VERSION] A tiny quest to find your path and change your village for the better.",
          ogImage:
            "https://amble.studio/wp-content/uploads/2021/12/Arriba-Town-Rectangle-1.png",
        },
        "Umberdred-Institute": {
          gameTitle: "The Umberdred Institute for Emerging Evildoers",
          gameBlurb:
            "Tell silly stories about how aspiring villains accept unlikely quests to earn dubious certifications in evildoing skills. By Amble Studio.",
          ogImage:
            "https://diegeticgames.com/uploads/sized-umberdreds-banner-square.png",
        },
      },
    };
  },
  metaInfo() {
    return {
      title: this.gameMetaData[this.routeGSheetID].gameTitle,
      meta: [
        {
          property: "description",
          content: this.gameMetaData[this.routeGSheetID].gameBlurb,
          vmid: "description",
        },
        {
          property: "og:title",
          content: this.gameMetaData[this.routeGSheetID].gameTitle,
          vmid: "og:title",
        },
        {
          property: "og:description",
          content: this.gameMetaData[this.routeGSheetID].gameBlurb,
          vmid: "og:description",
        },
        {
          property: "og:image",
          content: this.gameMetaData[this.routeGSheetID].ogImage,
          vmid: "og:image",
        },
        {
          property: "og:url",
          content: location.hostname.toString() + "/#" + this.$route.fullPath,
          vmid: "og:url",
        },
        {
          property: "twitter:card",
          content: "summary",
          vmid: "twitter:card",
        },
        {
          property: "og:site_name",
          content: "Play.Amble.Studio",
          vmid: "og:site_name",
        },
        {
          property: "twitter:image:alt",
          content: this.gameMetaData[this.routeGSheetID].gameTitle + " logo",
          vmid: "twitter:image:alt",
        },
      ],
    };
  },
  mounted() {
    document.dispatchEvent(new Event("x-app-rendered"));
    if (location.hostname.toString() !== "localhost") {
      this.$mixpanel.track("Visit Game Session", {
        game_name: this.gameMetaData[this.routeGSheetID].gameTitle,
        session_url: location.hostname.toString() + this.$route.fullPath,
        format: "Custom",
      });
    }
  },
  methods: {},
};
</script>

<style scoped>
</style>
