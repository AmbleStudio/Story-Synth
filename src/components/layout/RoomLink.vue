<template>
  <div class="roomLink-section">
    <div class="room-link flex-row d-flex" v-if="$route.params.roomID">
      <transition name="bounce" mode="out-in">
        <div
          v-if="roomInfo"
          :key="Object.keys(roomInfo).length"
          class="pt-2 px-2 game-meta live-player-counter"
          v-bind:style="{ color: color }"
        >
          {{ Object.keys(roomInfo).length }} 👀
        </div>
      </transition>

      <button
        class="btn btn-outline-dark ml-auto border-0"
        @click="$bvToast.show('copyToast')"
        v-on:click="copyTextToClipboard()"
        type="button"
        v-bind:style="{ color: color }"
      >
        <b-icon-link45deg></b-icon-link45deg> Copy URL
      </button>

      <b-toast
        variant="success"
        id="copyToast"
        auto-hide-delay="1000"
        no-close-button
      >
        Link copied to clipboard
      </b-toast>
    </div>
  </div>
</template>

<script>
import {notifyMyOnlineStatus, onRoomInfoUpdate} from "../../firebase/models/players_in_room.js";

export default {
  name: "app-roomLink",
  props: {
    routeRoomID: String,
    color: String,
  },
  data() {
    return {
      roomID: null,
      gameType: null,
      gSheetID: null,
      currentUrl: location.hostname.toString() + "/" + this.$route.fullPath,
      roomInfo: {},
      context: null,
    };
  },
  mounted() {
    if (this.routeRoomID) {
      
      notifyMyOnlineStatus(this.routeRoomID);

      onRoomInfoUpdate(this.routeRoomID, (roomInfo) => {
        console.log(roomInfo)
        this.roomInfo = roomInfo
      })

      this.$gtag.event("reachedGameSession", {
        sheetID: this.$route.gSheetID,
        gameSessionURL: this.currentUrl,
      });

      this.updateUrl();
    }
  },
  watch: {
    $route() {
      if (this.routeRoomID) {
        notifyMyOnlineStatus(this.routeRoomID);

        onRoomInfoUpdate(this.routeRoomID, (roomInfo) => {
            console.log({roomInfo})
            this.roomInfo = roomInfo
            });

        this.$gtag.event("reachedGameSession", {
          sheetID: this.$route.gSheetID,
          gameSessionURL: this.currentUrl,
        });
      }
    },
  },
  updated() {
    this.updateUrl();
  },
  methods: {
    updateUrl() {
      if (!this.$route.params.userRole) {
        this.currentUrl =
          "https://" + location.hostname.toString() + this.$route.fullPath;
      } else {
        this.currentUrl =
          "https://" +
          location.hostname.toString() +
          "/" +
          this.$route.params.gameType +
          "/" +
          this.$route.params.gSheetID +
          "/" +
          this.$route.params.roomID +
          "/player/";
      }
      console.log(
        "current URL is now",
        this.$route.params.userRole,
        this.currentUrl
      );
    },
    copyTextToClipboard() {
      navigator.clipboard.writeText(this.currentUrl).then(
        function () {
          console.log("copied url");
        },
        function () {
          console.log("copy failed");
        }
      );
    },
  },
};
</script>

<style scoped>
.room-link {
}

.live-player-counter {
  color: #343a40;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
