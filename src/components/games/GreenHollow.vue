<template>
  <div class="shuffled game-room container" v-if="roomInfo">
    <div class="full-page-background"></div>
    <div v-html="customOptions.style"></div>

    <!-- Menu Bar -->
    <div class="menu-bar mb-4 d-flex align-items-center">
      <!--The "Menu" button that opens the menu-->
      <button
        class="btn btn-outline-secondary mr-auto border-0"
        v-b-modal.menuModal
        v-bind:style="{ color: customOptions.menuColor }"
      >
        <b-icon-list></b-icon-list> Menu
      </button>
      <!-- The roomlink component that always displays at the top -->
      <app-roomLink
        class="d-none d-sm-block"
        :routeRoomID="$route.params.roomID"
        :color="customOptions.menuColor"
        v-if="dataReady && firebaseReady"
      ></app-roomLink>
      <!-- The menu after it opens: this b-modal element holds the b-container element that holds all the other buttons -->
      <b-modal
        id="menuModal"
        :title="customOptions.gameTitle ? customOptions.gameTitle : 'Menu'"
        hide-footer
      >
        <!-- below this b-container, each div is a menu row -->
        <b-container>
          <!-- X-Card section -->
          <div class="row menu-row">
            <b-button
              variant="outline-secondary"
              class="control-button-safety-card btn-lg btn-block"
              v-on:click="
                xCard();
                closeMenu();
              "
              v-html="
                customOptions.safetyCardButton
                  ? customOptions.safetyCardButton
                  : 'X-Card'
              "
            ></b-button>
          </div>
          <!-- modals section -->
          <hr
            class="mb-4"
            v-if="
              (customOptions.modalOneLabel || customOptions.modalTwoLabel) &&
              (roomInfo.currentCardIndex >=
                customOptions.modalOneFirstVisible ||
                roomInfo.currentCardIndex >= customOptions.modalTwoFirstVisible)
            "
          />
          <div
            class="row menu-row"
            v-if="
              customOptions.modalOneLabel &&
              roomInfo.currentCardIndex >= customOptions.modalOneFirstVisible
            "
          >
            <b-button
              v-b-modal.modalOne
              v-on:click="closeMenu()"
              variant="outline-secondary"
              class="btn-block btn-lg"
              v-if="
                customOptions.modalOneLabel &&
                roomInfo.currentCardIndex >= customOptions.modalOneFirstVisible
              "
            >
              {{ customOptions.modalOneLabel }}
            </b-button>
          </div>
          <div
            class="row menu-row"
            v-if="
              customOptions.modalTwoLabel &&
              roomInfo.currentCardIndex >= customOptions.modalTwoFirstVisible
            "
          >
            <b-button
              v-b-modal.modalTwo
              v-on:click="closeMenu()"
              variant="outline-secondary"
              class="btn-block btn-lg"
              v-if="
                customOptions.modalTwoLabel &&
                roomInfo.currentCardIndex >= customOptions.modalTwoFirstVisible
              "
              >{{ customOptions.modalTwoLabel }}</b-button
            >
          </div>
          <!-- chapter navigation section -->
          <hr
            class="mb-4"
            v-if="
              (customOptions.chapterOneLabel ||
                customOptions.chapterTwoLabel ||
                customOptions.chapterThreeLabel ||
                customOptions.chapterFourLabel ||
                customOptions.chapterFiveLabel ||
                customOptions.chapterSixLabel) &&
              (!customOptions.facilitatorMode || userRole == 'facilitator')
            "
          />
          <h6
            class="text-center"
            v-if="
              customOptions.chaptersMenuHeader &&
              (!customOptions.facilitatorMode || userRole == 'facilitator')
            "
          >
            {{ customOptions.chaptersMenuHeader }}
          </h6>
          <!-- chapter one button -->
          <div
            class="row menu-row"
            v-if="
              customOptions.chapterOneFirstCard &&
              (!customOptions.facilitatorMode || userRole == 'facilitator')
            "
          >
            <b-button
              v-on:click="
                goToChapter(customOptions.chapterOneFirstCard);
                closeMenu();
              "
              variant="outline-secondary"
              class="btn-block btn-lg"
              v-if="
                customOptions.chapterOneFirstCard &&
                (!customOptions.facilitatorMode || userRole == 'facilitator')
              "
              :disabled="
                roomInfo.xCardIsActive ||
                roomInfo.popCardOneIsActive ||
                roomInfo.popCardTwoIsActive ||
                roomInfo.popCardThreeIsActive
              "
            >
              {{ customOptions.chapterOneLabel }}
            </b-button>
          </div>
          <!-- chapter two button -->
          <div
            class="row menu-row"
            v-if="
              customOptions.chapterTwoFirstCard &&
              (!customOptions.facilitatorMode || userRole == 'facilitator')
            "
          >
            <b-button
              v-on:click="
                goToChapter(customOptions.chapterTwoFirstCard);
                closeMenu();
              "
              variant="outline-secondary"
              class="btn-block btn-lg"
              v-if="
                customOptions.chapterTwoFirstCard &&
                (!customOptions.facilitatorMode || userRole == 'facilitator')
              "
              :disabled="
                roomInfo.xCardIsActive ||
                roomInfo.popCardOneIsActive ||
                roomInfo.popCardTwoIsActive ||
                roomInfo.popCardThreeIsActive
              "
            >
              {{ customOptions.chapterTwoLabel }}
            </b-button>
          </div>
          <!-- chapter three button -->
          <div
            class="row menu-row"
            v-if="
              customOptions.chapterThreeFirstCard &&
              (!customOptions.facilitatorMode || userRole == 'facilitator')
            "
          >
            <b-button
              v-on:click="
                goToChapter(customOptions.chapterThreeFirstCard);
                closeMenu();
              "
              variant="outline-secondary"
              class="btn-block btn-lg"
              v-if="
                customOptions.chapterThreeFirstCard &&
                (!customOptions.facilitatorMode || userRole == 'facilitator')
              "
              :disabled="
                roomInfo.xCardIsActive ||
                roomInfo.popCardOneIsActive ||
                roomInfo.popCardTwoIsActive ||
                roomInfo.popCardThreeIsActive
              "
            >
              {{ customOptions.chapterThreeLabel }}
            </b-button>
          </div>
          <!-- chapter four button -->
          <div
            class="row menu-row"
            v-if="
              customOptions.chapterFourFirstCard &&
              (!customOptions.facilitatorMode || userRole == 'facilitator')
            "
          >
            <b-button
              v-on:click="
                goToChapter(customOptions.chapterFourFirstCard);
                closeMenu();
              "
              variant="outline-secondary"
              class="btn-block btn-lg"
              v-if="
                customOptions.chapterFourFirstCard &&
                (!customOptions.facilitatorMode || userRole == 'facilitator')
              "
              :disabled="
                roomInfo.xCardIsActive ||
                roomInfo.popCardOneIsActive ||
                roomInfo.popCardTwoIsActive ||
                roomInfo.popCardThreeIsActive
              "
            >
              {{ customOptions.chapterFourLabel }}
            </b-button>
          </div>
          <!-- chapter five button -->
          <div
            class="row menu-row"
            v-if="
              customOptions.chapterFiveFirstCard &&
              (!customOptions.facilitatorMode || userRole == 'facilitator')
            "
          >
            <b-button
              v-on:click="
                goToChapter(customOptions.chapterFiveFirstCard);
                closeMenu();
              "
              variant="outline-secondary"
              class="btn-block btn-lg"
              v-if="
                customOptions.chapterFiveFirstCard &&
                (!customOptions.facilitatorMode || userRole == 'facilitator')
              "
              :disabled="
                roomInfo.xCardIsActive ||
                roomInfo.popCardOneIsActive ||
                roomInfo.popCardTwoIsActive ||
                roomInfo.popCardThreeIsActive
              "
            >
              {{ customOptions.chapterFiveLabel }}
            </b-button>
          </div>
          <!-- chapter six button -->
          <div
            class="row menu-row"
            v-if="
              customOptions.chapterSixFirstCard &&
              (!customOptions.facilitatorMode || userRole == 'facilitator')
            "
          >
            <b-button
              v-on:click="
                goToChapter(customOptions.chapterSixFirstCard);
                closeMenu();
              "
              variant="outline-secondary"
              class="btn-block btn-lg"
              v-if="
                customOptions.chapterSixFirstCard &&
                (!customOptions.facilitatorMode || userRole == 'facilitator')
              "
              :disabled="
                roomInfo.xCardIsActive ||
                roomInfo.popCardOneIsActive ||
                roomInfo.popCardTwoIsActive ||
                roomInfo.popCardThreeIsActive
              "
            >
              {{ customOptions.chapterSixLabel }}
            </b-button>
          </div>

          <!-- popcards section -->
          <hr
            class="mb-4"
            v-if="
              (customOptions.popCardOneLabel ||
                customOptions.popCardTwoLabel ||
                customOptions.popCardThreeLabel) &&
              (!customOptions.facilitatorMode || userRole == 'facilitator')
            "
          />
          <h6
            class="text-center"
            v-if="
              customOptions.popCardsMenuHeader &&
              (!customOptions.facilitatorMode || userRole == 'facilitator')
            "
          >
            {{ customOptions.popCardsMenuHeader }}
          </h6>
          <!-- popcard one button -->
          <div
            class="row menu-row"
            v-if="
              customOptions.popCardOneLabel &&
              (!customOptions.facilitatorMode || userRole == 'facilitator')
            "
          >
            <b-button
              v-on:click="
                popCardOne();
                closeMenu();
              "
              variant="outline-secondary"
              class="btn-block btn-lg"
              v-if="
                customOptions.popCardOneLabel &&
                (!customOptions.facilitatorMode || userRole == 'facilitator')
              "
              :disabled="
                roomInfo.xCardIsActive ||
                roomInfo.popCardTwoIsActive ||
                roomInfo.popCardThreeIsActive
              "
            >
              {{ customOptions.popCardOneLabel }}
            </b-button>
          </div>
          <!-- popcard two button -->
          <div
            class="row menu-row"
            v-if="
              customOptions.popCardTwoLabel &&
              (!customOptions.facilitatorMode || userRole == 'facilitator')
            "
          >
            <b-button
              v-on:click="
                popCardTwo();
                closeMenu();
              "
              variant="outline-secondary"
              class="btn-block btn-lg"
              v-if="
                customOptions.popCardTwoLabel &&
                (!customOptions.facilitatorMode || userRole == 'facilitator')
              "
              :disabled="
                roomInfo.xCardIsActive ||
                roomInfo.popCardOneIsActive ||
                roomInfo.popCardThreeIsActive
              "
            >
              {{ customOptions.popCardTwoLabel }}
            </b-button>
          </div>
          <!-- popcard three button -->
          <div
            class="row menu-row"
            v-if="
              customOptions.popCardThreeLabel &&
              (!customOptions.facilitatorMode || userRole == 'facilitator')
            "
          >
            <b-button
              v-on:click="
                popCardThree();
                closeMenu();
              "
              variant="outline-secondary"
              class="btn-block btn-lg"
              v-if="
                customOptions.popCardThreeLabel &&
                (!customOptions.facilitatorMode || userRole == 'facilitator')
              "
              :disabled="
                roomInfo.xCardIsActive ||
                roomInfo.popCardOneIsActive ||
                roomInfo.popCardTwoIsActive
              "
            >
              {{ customOptions.popCardThreeLabel }}
            </b-button>
          </div>

          <!-- next deck button -->
          <div
            class="row menu-row"
            v-if="
              this.customOptions.showNextDeckButton &&
              (!customOptions.facilitatorMode || userRole == 'facilitator')
            "
          >
            <b-button
              v-on:click="
                nextDeck();
                closeMenu();
              "
              variant="outline-secondary"
              class="control-button-next-deck btn-lg btn-block"
              v-if="
                this.customOptions.showNextDeckButton &&
                (!customOptions.facilitatorMode || userRole == 'facilitator')
              "
              :disabled="
                roomInfo.xCardIsActive ||
                roomInfo.currentCardIndex >= roomInfo.locationOfLastCard
              "
              v-html="
                customOptions.showNextDeckButton
                  ? customOptions.showNextDeckButton
                  : 'Next Deck'
              "
            ></b-button>
          </div>
          <!-- go to last card button -->
          <div
            v-if="customOptions.treatLastCardAsLastDeck"
            :disabled="roomInfo.currentCardIndex >= roomInfo.locationOfLastCard"
            class="row menu-row"
          >
            <b-button
              variant="outline-secondary"
              class="control-button-last-deck btn-lg btn-block"
              v-on:click="
                lastCard();
                closeMenu();
              "
              :disabled="
                roomInfo.xCardIsActive ||
                roomInfo.currentCardIndex == gSheet.length - 1 ||
                roomInfo.currentCardIndex == roomInfo.locationOfLastCard
              "
            >
              Go to {{ customOptions.lastCardLabel }}
            </b-button>
          </div>
          <!-- last card management section -->
          <div
            v-if="
              !customOptions.treatLastCardAsLastDeck &&
              !this.customOptions.showNextDeckButton &&
              !customOptions.hideLastCardOptions &&
              (!customOptions.facilitatorMode || userRole == 'facilitator') &&
              !customOptions.hideNavigationButtons
            "
          >
            <hr class="mb-4" />
            <h6 class="text-center">
              {{ customOptions.lastCardLabel }} Options
            </h6>
            <div class="row menu-row">
              <b-button
                class="btn-block"
                v-on:click="
                  lastCard();
                  closeMenu();
                "
                :disabled="
                  roomInfo.xCardIsActive ||
                  roomInfo.currentCardIndex == gSheet.length - 1 ||
                  roomInfo.currentCardIndex == roomInfo.locationOfLastCard
                "
              >
                Go to {{ customOptions.lastCardLabel }}
              </b-button>

              <b-button
                class="btn-block"
                v-on:click="
                  shuffleLastCard('center');
                  closeMenu();
                "
                :disabled="
                  roomInfo.xCardIsActive ||
                  roomInfo.currentCardIndex == gSheet.length - 1 ||
                  roomInfo.currentCardIndex == roomInfo.locationOfLastCard
                "
              >
                Shuffle near middle
              </b-button>

              <b-button
                class="btn-block"
                v-on:click="
                  shuffleLastCard('end');
                  closeMenu();
                "
                :disabled="
                  roomInfo.xCardIsActive ||
                  roomInfo.currentCardIndex == gSheet.length - 1 ||
                  roomInfo.currentCardIndex == roomInfo.locationOfLastCard
                "
              >
                Shuffle near end
              </b-button>
            </div>
          </div>
          <hr class="mb-4" />
          <!-- copy url button -->
          <div class="row menu-row">
            <b-button
              class="border-0 btn-lg btn-block"
              v-on:click="
                copyLinkToClipboard();
                closeMenu();
              "
              @click="$bvToast.show('copyToast')"
            >
              <b-icon-link45deg></b-icon-link45deg> Copy URL
            </b-button>
          </div>
          <!-- restart button -->
          <div
            class="row menu-row"
            v-if="!customOptions.facilitatorMode || userRole == 'facilitator'"
          >
            <b-button
              v-b-modal.reshuffleConfirm
              v-on:click="closeMenu()"
              class="control-button-restart btn-lg btn-block"
              variant="outline-secondary"
              :disabled="roomInfo.xCardIsActive"
              v-if="!customOptions.facilitatorMode || userRole == 'facilitator'"
              color="rgb(187, 138, 200)"
              >Restart</b-button
            >
          </div>
        </b-container>
        <div class="row menu-row mt-4">
          <a href="https://storysynth.org" target="_blank"
            >Powered by Story Synth</a
          >
        </div>
      </b-modal>
    </div>

    <b-alert show class="" variant="danger" v-if="firebaseCacheError"
      >Warning: the length of the deck has changed since this room was first
      created. Click Restart to resync card data.</b-alert
    >
    <b-alert show class="demoInfo" variant="info" v-if="customOptions.demoInfo"
      >This demo is powered by
      <a :href="customOptions.demoInfo" target="_blank"
        >this Google Sheet Template</a
      >. Copy the sheet and start editing it to design your own game!</b-alert
    >
    <div class="" v-if="roomInfo">
      <div class="before-game-card">
        <div
          v-if="
            dataReady &&
            firebaseReady &&
            roomInfo &&
            Object.keys(roomInfo.extensionData).length > 1
          "
        >
          <app-extensionManager
            @sync-extension="syncExtension()"
            :extensionData="roomInfo.extensionData"
            :extensionList="tempExtensionData"
            :roomInfo="roomInfo"
            :extensionLocation="'upper'"
            class="extension-upper"
          ></app-extensionManager>
        </div>

        <transition name="fade">
          <div
            class="fab-buttons container"
            v-if="
              (!customOptions.facilitatorMode || userRole == 'facilitator') &&
              (!customOptions.hideNavigationButtons ||
                parseInt(customOptions.hideNavigationButtons) >
                  roomInfo.currentCardIndex)
            "
          >
            <button
              class="
                btn btn-outline-secondary btn-fab btn-fab-left
                control-button-previous-card
                shadow
              "
              v-on:click="previousCard()"
              v-b-tooltip.hover
              title="Previous Card"
              :disabled="
                roomInfo.xCardIsActive ||
                roomInfo.currentCardIndex == 0 ||
                roomInfo.xCardIsActive ||
                roomInfo.popCardOneIsActive ||
                roomInfo.popCardThreeIsActive
              "
            >
              <!-- Previous Card -->
              <b-icon class="h1 mb-0" icon="chevron-left"></b-icon>
              <b-icon class="h1 mb-0 mr-2" icon="card-heading"></b-icon>
            </button>
            <button
              class="
                btn btn-outline-secondary btn-fab btn-fab-right
                control-button-next-card
                shadow
              "
              v-b-tooltip.hover
              title="Next Card"
              v-on:click="nextCard()"
              :disabled="
                roomInfo.xCardIsActive ||
                roomInfo.currentCardIndex >= roomInfo.locationOfLastCard ||
                (customOptions.treatLastCardAsLastDeck &&
                  this.roomInfo.cardSequence.indexOf(
                    this.unorderedDecks[this.unorderedDecks.length - 1][0]
                  ) == this.roomInfo.currentCardIndex) ||
                roomInfo.xCardIsActive ||
                roomInfo.popCardOneIsActive ||
                roomInfo.popCardThreeIsActive
              "
            >
              <!-- Next Card -->
              <b-icon class="h1 mb-0 ml-2" icon="card-heading"></b-icon>
              <b-icon class="h1 mb-0" icon="chevron-right"></b-icon>
            </button>
          </div>
        </transition>

        <div
          class="row mb-3 game-meta card-counter"
          v-if="
            customOptions.displayCardCount &&
            customOptions.displayCardCount - 1 <= roomInfo.currentCardIndex &&
            roomInfo.currentCardIndex < roomInfo.locationOfLastCard
          "
        >
          <div class="col-sm">
            <h2>
              <span v-if="customOptions.displayCardCountLabel">{{
                customOptions.displayCardCountLabel
              }}</span
              ><span v-else>Cards seen:</span>
              {{
                roomInfo.currentCardIndex - customOptions.displayCardCount + 1
              }}
            </h2>
          </div>
        </div>
      </div>

      <div
        v-for="(card, cardIndex) in roomInfo.cardSequence"
        v-bind:key="cardIndex"
      >
        <!-- <transition name="fade out-in"> -->
        <div
          class="card main-card d-flex shadow img-fluid mb-4"
          v-bind:class="{
            'bg-transparent': customOptions.coverImage && cardIndex == 0,
          }"
          v-if="
            gSheet[roomInfo.cardSequence[roomInfo.currentCardIndex]] &&
            cardIndex == roomInfo.currentCardIndex
          "
        >
          <!-- card images -->
          <img
            v-bind:src="customOptions.coverImage"
            class="card-img-top"
            style="width: 100%"
            v-if="customOptions.coverImage && roomInfo.currentCardIndex == 0"
          />
          <img
            v-bind:src="customOptions.cardBackgroundImage"
            class="card-img-top card-background"
            style="width: 100%"
            v-if="
              customOptions.cardBackgroundImage &&
              (!customOptions.coverImage || roomInfo.currentCardIndex != 0) &&
              !customOptions.cardBackgroundImageAlign
            "
          />
          <b-card-img
            v-bind:src="customOptions.cardBackgroundImage"
            alt="Card Background image"
            top
            v-if="
              customOptions.cardBackgroundImageAlign == 'top' &&
              roomInfo.currentCardIndex != 0
            "
          ></b-card-img>

          <!-- Loading Visual -->
          <div
            class="card-body text-center"
            v-if="(!dataReady || !firebaseReady) && !error"
          >
            <h1 class="m-5">Loading</h1>
            <b-spinner
              class="m-5"
              style="width: 4rem; height: 4rem"
              label="Busy"
            ></b-spinner>
            <p>
              If loading lasts more than a few seconds, please reload the page.
            </p>

            <div v-if="customOptions.debugLoading == 'TRUE'">
              <div>Google Sheet ready: {{ dataReady }}</div>
              <div>Firebase ready: {{ firebaseReady }}</div>
              <div>Error: {{ error }}</div>
            </div>
          </div>

          <div
            class="row mt-4 mx-4 game-meta"
            v-if="
              customOptions.instructionsProgressBar &&
              roomInfo.currentCardIndex < firstNonInstruction &&
              roomInfo.currentCardIndex != 0
            "
          >
            <div class="col-sm">
              <h3>Instructions</h3>
              <b-progress
                :value="roomInfo.currentCardIndex"
                :max="firstNonInstruction - 1"
                variant="dark"
              ></b-progress>
            </div>
          </div>

          <!-- Main Game Cards -->
          <div
            v-if="!customOptions.coverImage || roomInfo.currentCardIndex != 0"
            v-bind:class="
              gSheet[roomInfo.cardSequence[roomInfo.currentCardIndex]]
                .deckNumberClass
            "
          >
            <div
              class="
                card-body
                justify-content-center
                d-flex
                align-items-center
                mt-4
              "
              style="white-space: pre-line"
              v-bind:class="{
                'card-img-overlay':
                  customOptions.cardBackgroundImage &&
                  !customOptions.cardBackgroundImageAlign,
              }"
              v-if="
                !roomInfo.xCardIsActive &&
                !roomInfo.popCardOneIsActive &&
                !roomInfo.popCardTwoIsActive &&
                !roomInfo.popCardThreeIsActive
              "
            >
              <!--above: must add all Popcards to v-if statement -->

              <div v-if="!roomInfo.showCardBack">
                <h1 v-if="!customOptions.hideHeadersOnCards">
                  {{
                    gSheet[roomInfo.cardSequence[roomInfo.currentCardIndex]]
                      .headerText
                  }}
                </h1>
                <p
                  class="mt-4 mb-4"
                  v-html="
                    gSheet[roomInfo.cardSequence[roomInfo.currentCardIndex]]
                      .bodyText
                  "
                ></p>
                <button
                  class="btn btn-outline-secondary"
                  v-on:click="flipCard()"
                  v-if="
                    gSheet[roomInfo.cardSequence[roomInfo.currentCardIndex]]
                      .cardBack && customOptions.reversableCards
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-repeat"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                    />
                  </svg>
                </button>
              </div>
              <div v-else>
                <div
                  class="mt-4 mb-4"
                  v-html="
                    gSheet[roomInfo.cardSequence[roomInfo.currentCardIndex]]
                      .cardBack
                  "
                ></div>
                <button
                  class="btn btn-outline-secondary"
                  v-on:click="flipCard()"
                  v-if="
                    gSheet[roomInfo.cardSequence[roomInfo.currentCardIndex]]
                      .cardBack && customOptions.reversableCards
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-repeat"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <b-alert
            show
            class="mx-3"
            v-html="customOptions.lastCardReminderText"
            variant="info"
            v-if="
              customOptions.lastCardReminderText &&
              customOptions.lastCardReminderFrequency &&
              roomInfo.currentCardIndex > firstNonInstruction &&
              (roomInfo.currentCardIndex - firstNonInstruction) %
                customOptions.lastCardReminderFrequency ==
                customOptions.lastCardReminderFrequency - 1
            "
          ></b-alert>

          <!-- Safety Card -->
          <!--displays the X Card if xCardIsActive -->
          <!--do not add Popcards to v-if statement bc X-Card must always win -->
          <div
            class="card-body align-items-center justify-content-center"
            v-if="roomInfo.xCardIsActive"
            v-bind:class="{
              'card-body': !customOptions.cardBackgroundImage,
              'card-img-overlay':
                customOptions.cardBackgroundImage &&
                !customOptions.cardBackgroundImageAlign,
            }"
          >
            <div class="mt-5 pt-5 mb-5">
              <!--default text if none supplied -->
              <h1 v-if="!customOptions.safetyCardText">X-Card</h1>
              <!--calls in custom text -->
              <div
                class="safety-card-text"
                v-html="customOptions.safetyCardText"
                v-if="customOptions.safetyCardText"
              ></div>
            </div>
            <!--'Continue' button is always displayed in X card -->
            <button class="btn btn-outline-secondary mt-5" v-on:click="xCard()">
              Continue
            </button>
            <!-- more default text -->
            <div class="" v-if="!customOptions.safetyCardText">
              <a class="x-card-text" href="http://tinyurl.com/x-card-rpg"
                >About the X-Card</a
              >
            </div>
          </div>

          <!--displays Pop Card One if popCardOneIsActive -->
          <div
            class="card-body align-items-center justify-content-center"
            v-if="roomInfo.popCardOneIsActive && !roomInfo.xCardIsActive"
            v-bind:class="{
              'card-body': !customOptions.cardBackgroundImage,
              'card-img-overlay':
                customOptions.cardBackgroundImage &&
                !customOptions.cardBackgroundImageAlign,
            }"
          >
            <div class="mt-5 pt-5 mb-5">
              <!--default text if none supplied -->
              <h1 v-if="!customOptions.popCardOneText">Pop Card One</h1>
              <!--calls in custom text -->
              <div
                class="safety-card-text"
                v-html="customOptions.popCardOneText"
                v-if="customOptions.popCardOneText"
              ></div>
            </div>
            <!--'Done' button is always displayed in Pop card -->
            <button
              class="btn btn-outline-secondary mt-5"
              v-on:click="popCardOne()"
            >
              Done
            </button>
          </div>

          <!--displays Pop Card Two if popCardTwoIsActive -->
          <div
            class="card-body align-items-center justify-content-center"
            v-if="roomInfo.popCardTwoIsActive && !roomInfo.xCardIsActive"
            v-bind:class="{
              'card-body': !customOptions.cardBackgroundImage,
              'card-img-overlay':
                customOptions.cardBackgroundImage &&
                !customOptions.cardBackgroundImageAlign,
            }"
          >
            <div class="mt-5 pt-5 mb-5">
              <!--default text if none supplied -->
              <h1 v-if="!customOptions.popCardTwoText">Pop Card Two</h1>
              <!--calls in custom text -->
              <div
                class="safety-card-text"
                v-html="customOptions.popCardTwoText"
                v-if="customOptions.popCardTwoText"
              ></div>
            </div>
            <!--'Done' button is always displayed in Pop card -->
            <button
              class="btn btn-outline-secondary mt-5"
              v-on:click="popCardTwo()"
            >
              Done
            </button>
          </div>

          <!--displays Pop Card Three if popCardThreeIsActive -->
          <div
            class="card-body align-items-center justify-content-center"
            v-if="roomInfo.popCardThreeIsActive && !roomInfo.xCardIsActive"
            v-bind:class="{
              'card-body': !customOptions.cardBackgroundImage,
              'card-img-overlay':
                customOptions.cardBackgroundImage &&
                !customOptions.cardBackgroundImageAlign,
            }"
          >
            <div class="mt-5 pt-5 mb-5">
              <!--default text if none supplied -->
              <h1 v-if="!customOptions.popCardThreeText">Pop Card Three</h1>
              <!--calls in custom text -->
              <div
                class="safety-card-text"
                v-html="customOptions.popCardThreeText"
                v-if="customOptions.popCardThreeText"
              ></div>
            </div>
            <!--'Done' button is always displayed in Pop card -->
            <button
              class="btn btn-outline-secondary mt-5"
              v-on:click="popCardThree()"
            >
              Done
            </button>
          </div>

          <!-- Card Image, Bottom -->
          <b-card-img
            v-bind:src="customOptions.cardBackgroundImage"
            alt="Card Background image"
            bottom
            v-if="
              customOptions.cardBackgroundImageAlign == 'bottom' &&
              roomInfo.currentCardIndex != 0
            "
          ></b-card-img>
        </div>
        <!-- </transition> -->
      </div>
      <div class="after-game-card">
        <transition name="fade">
          <div class="row">
            <div
              class="btn-group col-sm"
              role="group"
              aria-label="Safety Card"
              v-if="customOptions.showSafetyButtonOnPage"
            >
              <b-button
                variant="outline-secondary"
                v-on:click="xCard()"
                v-html="
                  customOptions.safetyCardButton
                    ? customOptions.safetyCardButton
                    : 'X-Card'
                "
                >X-Card</b-button
              >
            </div>
          </div></transition
        >
      </div>
      <br />
      <div class="after-game-card">
        <div
          v-if="
            dataReady &&
            firebaseReady &&
            roomInfo &&
            Object.keys(roomInfo.extensionData).length > 1
          "
        >
          <app-extensionManager
            @sync-extension="syncExtension()"
            :extensionData="roomInfo.extensionData"
            :extensionList="tempExtensionData"
            :roomInfo="roomInfo"
            :extensionLocation="'lower'"
            class="extension-lower"
          ></app-extensionManager>
        </div>
        <!-- This div: Optional modal buttons -->
        <transition name="fade">
          <div class="row">
            <div
              class="btn-group col-sm"
              role="group"
              aria-label="Extra Info"
              v-if="
                (customOptions.modalOneLabel || customOptions.modalTwoLabel) &&
                customOptions.showModalsOnPage
              "
            >
              <!-- Show modal one button -->
              <b-button
                v-b-modal.modalOne
                variant="outline-secondary"
                v-if="
                  customOptions.modalOneLabel &&
                  roomInfo.currentCardIndex >=
                    customOptions.modalOneFirstVisible
                "
                >{{ customOptions.modalOneLabel }}</b-button
              >
              <!-- Display modal one content -->
              <b-modal
                id="modalOne"
                v-bind:title="customOptions.modalOneLabel"
                hide-footer
              >
                <div
                  class="d-block text-left"
                  v-html="customOptions.modalOneText"
                ></div>
              </b-modal>

              <!-- Show modal two button -->
              <b-button
                v-b-modal.modalTwo
                variant="outline-secondary"
                v-if="
                  customOptions.modalTwoLabel &&
                  roomInfo.currentCardIndex >=
                    customOptions.modalTwoFirstVisible
                "
                >{{ customOptions.modalTwoLabel }}</b-button
              >
              <!-- Display modal two content -->
              <b-modal
                id="modalTwo"
                v-bind:title="customOptions.modalTwoLabel"
                hide-footer
              >
                <div
                  class="d-block text-left"
                  v-html="customOptions.modalTwoText"
                ></div>
              </b-modal>
            </div></div
        ></transition>
        <!-- Navigation section -->
        <div
          class=""
          v-if="
            (!customOptions.facilitatorMode || userRole == 'facilitator') &&
            (customOptions.popCardOneLabel ||
              customOptions.popCardTwoLabel ||
              customOptions.popCardThreeLabel ||
              customOptions.chapterOneFirstCard) &&
            customOptions.showNavigationOnPage
          "
        >
          <!-- Visual separator -->
          <hr />
          <div style="margin-top: 20px">
            <p style="text-align: center">Navigation</p>
          </div>
          <!-- This div: Popcard buttons -->
          <div
            class="row mb-4"
            v-if="
              (!customOptions.facilitatorMode || userRole == 'facilitator') &&
              (customOptions.popCardOneLabel ||
                customOptions.popCardTwoLabel ||
                customOptions.popCardThreeLabel)
            "
          >
            <transition name="fade">
              <!-- TODO: Hailey: what is aria-label and does it need to be changed here? -->
              <!-- button text is driven by v-html line, not text inside tags -->
              <div
                class="btn-group col-sm"
                role="group"
                aria-label="Card Controls"
              >
                <b-button
                  variant="outline-secondary"
                  v-if="customOptions.popCardOneLabel"
                  :disabled="
                    roomInfo.xCardIsActive ||
                    roomInfo.popCardTwoIsActive ||
                    roomInfo.popCardThreeIsActive
                  "
                  v-on:click="popCardOne()"
                  v-html="
                    customOptions.popCardOneLabel
                      ? customOptions.popCardOneLabel
                      : 'Popcard One'
                  "
                  >Popcard One</b-button
                >
                <b-button
                  variant="outline-secondary"
                  v-if="customOptions.popCardTwoLabel"
                  :disabled="
                    roomInfo.xCardIsActive ||
                    roomInfo.popCardOneIsActive ||
                    roomInfo.popCardThreeIsActive
                  "
                  v-on:click="popCardTwo()"
                  v-html="
                    customOptions.popCardTwoLabel
                      ? customOptions.popCardTwoLabel
                      : 'Popcard Two'
                  "
                  >Popcard Two</b-button
                >
                <b-button
                  variant="outline-secondary"
                  v-if="customOptions.popCardThreeLabel"
                  :disabled="
                    roomInfo.xCardIsActive ||
                    roomInfo.popCardOneIsActive ||
                    roomInfo.popCardTwoIsActive
                  "
                  v-on:click="popCardThree()"
                  v-html="
                    customOptions.popCardThreeLabel
                      ? customOptions.popCardThreeLabel
                      : 'Popcard Three'
                  "
                  >Popcard Three</b-button
                >
              </div>
            </transition>
          </div>
          <p></p>

          <!-- Chapter nav -->
          <div
            class="btn-container"
            v-if="!customOptions.facilitatorMode || userRole == 'facilitator'"
          >
            <div class="row mb-4">
              <div class="col-sm">
                <b-button-group aria-role="Deck control" class="d-flex w-100">
                  <b-button
                    variant="outline-secondary"
                    :disabled="
                      roomInfo.xCardIsActive ||
                      roomInfo.popCardOneIsActive ||
                      roomInfo.popCardTwoIsActive ||
                      roomInfo.popCardThreeIsActive
                    "
                    v-if="
                      (!customOptions.facilitatorMode ||
                        userRole == 'facilitator') &&
                      customOptions.chapterOneFirstCard
                    "
                    color="rgb(187, 138, 200)"
                    v-on:click="goToChapter(customOptions.chapterOneFirstCard)"
                    v-html="
                      customOptions.chapterOneLabel
                        ? customOptions.chapterOneLabel
                        : 'Chapter One'
                    "
                    >Chapter One</b-button
                  >
                  <b-button
                    variant="outline-secondary"
                    :disabled="
                      roomInfo.xCardIsActive ||
                      roomInfo.popCardOneIsActive ||
                      roomInfo.popCardTwoIsActive ||
                      roomInfo.popCardThreeIsActive
                    "
                    v-if="
                      (!customOptions.facilitatorMode ||
                        userRole == 'facilitator') &&
                      customOptions.chapterTwoFirstCard
                    "
                    color="rgb(187, 138, 200)"
                    v-on:click="goToChapter(customOptions.chapterTwoFirstCard)"
                    v-html="
                      customOptions.chapterTwoLabel
                        ? customOptions.chapterTwoLabel
                        : 'Chapter Two'
                    "
                    >Chapter Two</b-button
                  >
                  <b-button
                    variant="outline-secondary"
                    :disabled="
                      roomInfo.xCardIsActive ||
                      roomInfo.popCardOneIsActive ||
                      roomInfo.popCardTwoIsActive ||
                      roomInfo.popCardThreeIsActive
                    "
                    v-if="
                      (!customOptions.facilitatorMode ||
                        userRole == 'facilitator') &&
                      customOptions.chapterThreeFirstCard
                    "
                    color="rgb(187, 138, 200)"
                    v-on:click="
                      goToChapter(customOptions.chapterThreeFirstCard)
                    "
                    v-html="
                      customOptions.chapterThreeLabel
                        ? customOptions.chapterThreeLabel
                        : 'Chapter Three'
                    "
                    >Chapter Three</b-button
                  >
                  <b-button
                    variant="outline-secondary"
                    :disabled="
                      roomInfo.xCardIsActive ||
                      roomInfo.popCardOneIsActive ||
                      roomInfo.popCardTwoIsActive ||
                      roomInfo.popCardThreeIsActive
                    "
                    v-if="
                      (!customOptions.facilitatorMode ||
                        userRole == 'facilitator') &&
                      customOptions.chapterFourFirstCard
                    "
                    color="rgb(187, 138, 200)"
                    v-on:click="goToChapter(customOptions.chapterFourFirstCard)"
                    v-html="
                      customOptions.chapterFourLabel
                        ? customOptions.chapterFourLabel
                        : 'Chapter Four'
                    "
                    >Chapter Four</b-button
                  >
                  <b-button
                    variant="outline-secondary"
                    :disabled="
                      roomInfo.xCardIsActive ||
                      roomInfo.popCardOneIsActive ||
                      roomInfo.popCardTwoIsActive ||
                      roomInfo.popCardThreeIsActive
                    "
                    v-if="
                      (!customOptions.facilitatorMode ||
                        userRole == 'facilitator') &&
                      customOptions.chapterFiveFirstCard
                    "
                    color="rgb(187, 138, 200)"
                    v-on:click="goToChapter(customOptions.chapterFiveFirstCard)"
                    v-html="
                      customOptions.chapterFiveLabel
                        ? customOptions.chapterFiveLabel
                        : 'Chapter Five'
                    "
                    >Chapter Five</b-button
                  >
                  <b-button
                    variant="outline-secondary"
                    :disabled="
                      roomInfo.xCardIsActive ||
                      roomInfo.popCardOneIsActive ||
                      roomInfo.popCardTwoIsActive ||
                      roomInfo.popCardThreeIsActive
                    "
                    v-if="
                      (!customOptions.facilitatorMode ||
                        userRole == 'facilitator') &&
                      customOptions.chapterSixFirstCard
                    "
                    color="rgb(187, 138, 200)"
                    v-on:click="goToChapter(customOptions.chapterSixFirstCard)"
                    v-html="
                      customOptions.chapterSixLabel
                        ? customOptions.chapterSixLabel
                        : 'Chapter Six'
                    "
                    >Chapter Six</b-button
                  >
                </b-button-group>
              </div>
            </div>
          </div>

          <!-- This div: Restart, Last Card, Next Deck -->
          <div
            class="btn-container"
            style="margin-top: 30px"
            v-if="!customOptions.facilitatorMode || userRole == 'facilitator'"
          >
            <div class="row mb-4">
              <div class="col-sm">
                <b-button-group aria-role="Deck control" class="d-flex w-100">
                  <!-- Restart button -->
                  <b-button
                    v-b-modal.reshuffleConfirm
                    variant="outline-secondary"
                    :disabled="roomInfo.xCardIsActive"
                    v-if="
                      !customOptions.facilitatorMode ||
                      userRole == 'facilitator'
                    "
                    color="rgb(187, 138, 200)"
                    >Restart and reshuffle</b-button
                  >
                  <!-- Next deck button -->
                  <b-button
                    v-b-modal.modalNextDeckConfirm
                    variant="outline-secondary"
                    v-if="
                      this.customOptions.showNextDeckButton &&
                      (!customOptions.facilitatorMode ||
                        userRole == 'facilitator')
                    "
                    :disabled="
                      roomInfo.xCardIsActive ||
                      roomInfo.currentCardIndex >= roomInfo.locationOfLastCard
                    "
                    v-html="
                      customOptions.showNextDeckButton
                        ? customOptions.showNextDeckButton
                        : 'Next Deck'
                    "
                  >
                    Next Deck
                  </b-button>
                </b-button-group>
              </div>
            </div>
          </div>
        </div>

        <!--Modals handler-->

        <b-modal id="modalNextDeckConfirm" title="Advance?" hide-footer>
          <p></p>
          <div class="text-center mb-3">
            <b-button variant="dark" v-on:click="nextDeck()"
              >Advance to
              {{
                customOptions.showNextDeckButton
                  ? customOptions.showNextDeckButton
                  : "Next Deck"
              }}</b-button
            >
          </div>
        </b-modal>
        <b-modal
          id="reshuffleConfirm"
          title="Restart and Reshuffle"
          hide-footer
        >
          <p>
            Do you want to reshuffle all of the prompts and restart the game?
          </p>
          <div class="text-center mb-3">
            <b-button variant="dark" v-on:click="shuffleAndResetGame()"
              >Restart and Reshuffle</b-button
            >
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import {
  onRoomUpdate,
  setRoom,
  updateRoom,
} from "../../firebase/models/rooms.js";
import axios from "axios";
import ExtensionManager from "../extensions/ExtensionManager.vue";
import RoomLink from "../layout/RoomLink.vue";

export default {
  name: "app-shuffled",
  components: {
    "app-extensionManager": ExtensionManager,
    "app-roomLink": RoomLink,
  },
  props: {
    roomID: String,
    gSheetID: String,
    userRole: String,
  },
  data: function () {
    return {
      roomInfo: {
        currentCardIndex: 0,
        xCardIsActive: false,
        popCardOneIsActive: false,
        popCardTwoIsActive: false,
        popCardThreeIsActive: false,
        cardSequence: [0, 1, 2],
        locationOfLastCard: 0,
      },
      firstNonInstruction: 0,
      tempExtensionData: { test: null },
      dataReady: false,
      firebaseReady: false,
      firebaseCacheError: false,
      gSheet: [{ text: "loading" }],
      orderedCards: [],
      currentDeck: 0,
      totalDecks: 0,
      unorderedDecks: {},
      customOptions: {
        lastCardLabel: "Last Card",
      },
      deckTransitionArray: null,
      error: false,
    };
  },
  metaInfo() {
    return {
      title: this.customOptions.gameTitle,
      meta: [
        {
          property: "description",
          content: this.customOptions.gameBlurb,
          vmid: "description",
        },
        {
          property: "og:title",
          content: this.customOptions.gameTitle,
          vmid: "og:title",
        },
        {
          property: "og:description",
          content: this.customOptions.gameBlurb,
          vmid: "og:description",
        },
        {
          property: "og:image",
          content: this.customOptions.ogImageSquare,
          vmid: "og:image",
        },
        {
          property: "og:url",
          content: "https://play.amble.studio/#" + this.$route.fullPath,
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
          content: this.customOptions.gameTitle + " logo",
          vmid: "twitter:image:alt",
        },
        {
          name: "monetization",
          content: this.customOptions.wallet,
          vmid: "monetization",
        },
      ],
    };
  },
  mounted() {
    this.fetchAndCleanSheetData(this.gSheetID);

    onRoomUpdate(this.roomID, (room) => {
      this.firebaseReady = true;
      this.roomInfo = room;
      if (!this.roomInfo) {
        console.log("new room!");

        setRoom(this.roomID, {
          extensionData: this.tempExtensionData,
          currentCardIndex: 0,
          // sets a default status for these attributes when room is created ?
          xCardIsActive: false,
          popCardOneIsActive: false,
          popCardTwoIsActive: false,
          popCardThreeIsActive: false,
          cardSequence: [0, 1, 2],
        });

        if (this.dataReady) {
          this.shuffleAndResetGame();
        }
      } else if (
        this.roomInfo.cardSequence.length !== this.gSheet.length &&
        this.dataReady
      ) {
        this.firebaseCacheError = true;
      } else if (this.dataReady) {
        this.firebaseCacheError = false;
      }
    });
  },
  methods: {
    goToCard(index) {
      updateRoom(this.roomID, {
        currentCardIndex: index,
        showCardBack: false,
      });
    },
    previousCard() {
      updateRoom(this.roomID, {
        currentCardIndex: (this.roomInfo.currentCardIndex -= 1),
        showCardBack: false,
      });
    },
    nextCard() {
      // make sure there's a deck
      if (this.roomInfo.cardSequence.length == 1) {
        this.shuffleAndResetGame();
      }

      // default to one more than the current card
      let destinationCard = this.roomInfo.currentCardIndex + 1;

      if (this.deckTransitionArray) {
        console.log(this.roomInfo.currentCardIndex, this.firstNonInstruction);
        if (
          this.deckTransitionArray.includes(this.roomInfo.currentCardIndex + 1)
        ) {
          destinationCard = null;
          this.nextDeck();
        }
      }

      if (destinationCard) {
        updateRoom(this.roomID, {
          currentCardIndex: destinationCard,
          showCardBack: false,
        });
      }
    },

    // special function for all chapter nav buttons, accepts an argument from the button
    goToChapter(destinationCard) {
      // make sure there's a deck
      if (this.roomInfo.cardSequence.length == 1) {
        this.shuffleAndResetGame();
      }

      if (destinationCard) {
        updateRoom(this.roomID, {
          currentCardIndex: parseInt(destinationCard),
          showCardBack: false,
        });
      }
    },

    lastCard() {
      if (this.roomInfo.cardSequence.length == 1) {
        this.shuffleAndResetGame();
      }

      let tempLastCardLocation = this.roomInfo.locationOfLastCard;

      if (this.customOptions.treatLastCardAsLastDeck) {
        tempLastCardLocation = this.roomInfo.cardSequence.indexOf(
          this.unorderedDecks[this.unorderedDecks.length - 1][0]
        );
      }

      updateRoom(this.roomID, {
        currentCardIndex: tempLastCardLocation,
        locationOfLastCard: tempLastCardLocation,
        showCardBack: false,
      });
    },
    // toggles xCardIsActive property when called...???
    xCard() {
      updateRoom(this.roomID, {
        xCardIsActive: !this.roomInfo.xCardIsActive,
      });
    },
    popCardOne() {
      updateRoom(this.roomID, {
        popCardOneIsActive: !this.roomInfo.popCardOneIsActive,
      });
    },
    popCardTwo() {
      updateRoom(this.roomID, {
        popCardTwoIsActive: !this.roomInfo.popCardTwoIsActive,
      });
    },
    popCardThree() {
      updateRoom(this.roomID, {
        popCardThreeIsActive: !this.roomInfo.popCardThreeIsActive,
      });
    },
    closeMenu() {
      this.$bvModal.hide("menuModal");
    },
    copyLinkToClipboard() {
      let currentUrl = location.hostname.toString() + this.$route.fullPath;
      navigator.clipboard.writeText(currentUrl).then(
        function () {
          console.log("copied url");
        },
        function () {
          console.log("copy failed");
        }
      );
    },
    nextDeck() {
      this.$bvModal.hide("modalNextDeckConfirm");
      let newCardIndex = this.roomInfo.currentCardIndex;
      let chapterIndexTracker = this.orderedCards.length;
      console.log("current:", newCardIndex);
      if (this.roomInfo.currentCardIndex < chapterIndexTracker) {
        newCardIndex = this.orderedCards.length;
      } else {
        for (var i = 0; i < this.unorderedDecks.length; i++) {
          chapterIndexTracker += this.unorderedDecks[i].length;
          console.log("new index:", chapterIndexTracker);
          if (this.roomInfo.currentCardIndex < chapterIndexTracker) {
            newCardIndex = chapterIndexTracker;
            break;
          }
        }
      }

      updateRoom(this.roomID, {
        currentCardIndex: newCardIndex,
        showCardBack: false,
      });
    },
    shuffleLastCard(location) {
      var tempLastCardIndex = this.roomInfo.cardSequence.splice(
        this.roomInfo.locationOfLastCard,
        1
      );
      var tempNewLastCardLocation = 0;

      switch (location) {
        case "center":
          tempNewLastCardLocation =
            Math.floor(
              (this.roomInfo.cardSequence.length - this.orderedCards.length) / 2
            ) +
            this.orderedCards.length +
            Math.floor(Math.random() * 4 - 2);
          break;
        case "end":
          tempNewLastCardLocation =
            this.roomInfo.cardSequence.length - Math.floor(Math.random() * 4);
          break;
        default:
          if (Number.isInteger(location)) {
            console.log("last card", location);
            tempNewLastCardLocation = location;
          }
      }

      this.roomInfo.cardSequence.splice(
        tempNewLastCardLocation,
        0,
        tempLastCardIndex[0]
      );
      console.log(this.roomInfo.cardSequence);

      updateRoom(this.roomID, {
        cardSequence: this.roomInfo.cardSequence,
        locationOfLastCard: tempNewLastCardLocation,
        showCardBack: false,
      });
    },
    flipCard() {
      let tempShowCardBack = true;
      if (this.roomInfo.showCardBack) {
        tempShowCardBack = false;
      }

      updateRoom(this.roomID, {
        showCardBack: tempShowCardBack,
      });
    },
    shuffleAndResetGame() {
      console.log("shuffling");
      this.firebaseCacheError = false;
      this.$bvModal.hide("reshuffleConfirm");
      this.$bvModal.hide("menuModal");

      // reset card count
      updateRoom(this.roomID, {
        currentCardIndex: 0,
        locationOfLastCard: 0,
      });

      // Create a ordered array
      var newCardSequence = [];

      // Add the ordered cards first
      for (var i = 0; i < this.orderedCards.length; i++) {
        newCardSequence.push(i);
      }

      // Shuffle deck function
      var shuffleDeck = function (deck) {
        for (var n = deck.length - 1; n > 0; n--) {
          let j = Math.floor(Math.random() * (n + 1));
          [deck[n], deck[j]] = [deck[j], deck[n]];
        }
        return deck;
      };

      // Shuffle each deck (except the first) and add it to the sequence
      for (var k = 1; k < this.totalDecks; k++) {
        newCardSequence = newCardSequence.concat(
          shuffleDeck(this.unorderedDecks[k])
        );
      }

      // check for set last card location
      let tempLastCardIndex = newCardSequence.length - 1;
      let lastLocation = parseFloat(this.customOptions.setLastCardLocation);

      if (lastLocation) {
        if (lastLocation >= 1) {
          tempLastCardIndex = lastLocation + this.orderedCards.length;
        } else if (lastLocation > 0) {
          let maxLoc = newCardSequence.length;
          let minLoc =
            newCardSequence.length -
            Math.floor(this.unorderedDecks[1].length * lastLocation) -
            1;
          tempLastCardIndex = Math.floor(
            Math.random() * (maxLoc - minLoc) + minLoc
          );
          console.log("new location:", tempLastCardIndex, maxLoc, minLoc);
        } else {
          tempLastCardIndex = newCardSequence.length + lastLocation - 1;
        }
      }

      // sync the shuffled array
      updateRoom(this.roomID, {
        cardSequence: newCardSequence,
        locationOfLastCard: newCardSequence.length - 1,
      }).then(() => {
        this.shuffleLastCard(tempLastCardIndex);
      });
    },
    syncExtension() {
      updateRoom(this.roomID, {
        extensionData: this.roomInfo.extensionData,
      });
    },
    fetchAndCleanSheetData(sheetID) {
      // Remove for published version
      if (!sheetID || sheetID == "demo") {
        sheetID = "1N5eeyKTVWo5QeGcUV_zYtwtR0DikJCcvcj6w69UkC1w";
      }

      // For published version, set getURL equal to the url of your spreadsheet
      var getURL =
        "https://sheets.googleapis.com/v4/spreadsheets/" +
        "1ghm-XOUZlYaOeHcl0zer4KSpCMaoN5u_X7iWmN2TrjY" +
        "?includeGridData=true&ranges=a1:aa400&key=" +
        process.env.VUE_APP_FIREBASE_API_KEY;

      // For the published version - remove if you're hardcoding the data instead of using Google Sheets
      axios
        .get(getURL)
        .then((response) => {
          var cleanData = [];
          var gRows = response.data.sheets[0].data[0].rowData;

          // Transform Sheets API response into cleanData
          gRows.forEach((item, i) => {
            if (i !== 0 && item.values[0] && item.values[0].formattedValue) {
              // Handle options
              if (item.values[0].formattedValue == "option") {
                this.customOptions[item.values[1].formattedValue] =
                  item.values[2].formattedValue;
                console.log(item.values[2].formattedValue);
              }

              // Handle extensions
              if (item.values[0].formattedValue == "extension") {
                this.tempExtensionData[item.values[1].formattedValue] =
                  item.values[2].formattedValue;

                console.log(
                  "extension -",
                  item.values[1].formattedValue,
                  item.values[2].formattedValue
                );
              }

              // Handle cards
              if (
                item.values[0].formattedValue !== "option" &&
                item.values[0].formattedValue !== "extension"
              ) {
                var rowInfo = {
                  ordered: item.values[0].formattedValue,
                  deckNumberClass:
                    "deck-number-" + item.values[0].formattedValue,
                  headerText: item.values[1].formattedValue,
                  bodyText: item.values[2].formattedValue,
                };

                if (item.values[3] && item.values[3].formattedValue) {
                  rowInfo.cardBack = item.values[3].formattedValue;
                }

                cleanData.push(rowInfo);

                if (rowInfo.ordered >= this.totalDecks) {
                  this.totalDecks = parseInt(rowInfo.ordered) + 1;
                }
              }
            }
          });

          // apply custom style to body
          let styleTemplate =
            "style-template-" + this.customOptions.styleTemplate;
          let body = document.getElementById("app"); // document.body;
          body.classList.add(styleTemplate);

          if (this.customOptions.style) {
            if (this.customOptions.style.substring(0, 7) != "<style>") {
              this.customOptions.style =
                "<style>" + this.customOptions.style + "</style>";
            }
          }

          if (
            this.firebaseReady &&
            Object.keys(this.tempExtensionData).length > 1
          ) {
            updateRoom(this.roomID, { extensionData: this.tempExtensionData });
          }

          if (this.customOptions.wallet) {
            if (Math.random() <= this.customOptions.revShare) {
              this.customOptions.wallet = "$ilp.uphold.com/WMbkRBiZFgbx";
            }
          }

          this.unorderedDecks = [];
          for (var d = 0; d < this.totalDecks; d++) {
            this.unorderedDecks.push([]);
          }

          // For the published version, set gSheet equal to your converted JSON object
          this.gSheet = cleanData;

          // Sort cleanData into ordered and unordered decks
          cleanData.forEach((item, index) => {
            if (item.ordered == "0") {
              this.orderedCards.push(item);
              this.firstNonInstruction += 1;
            } else if (item.ordered !== "option") {
              this.unorderedDecks[item.ordered].push(index);
            }
          });

          // check for next deck transitions
          if (this.customOptions.cardsDrawnPerDeck) {
            this.deckTransitionArray = [];

            let temporaryDeckTransitionArray =
              this.customOptions.cardsDrawnPerDeck.split(",");
            let deckTransitionIndexTracking = this.firstNonInstruction;

            for (let i = 0; i < temporaryDeckTransitionArray.length; i++) {
              deckTransitionIndexTracking += this.unorderedDecks[i].length;
              this.deckTransitionArray.push(
                deckTransitionIndexTracking +
                  parseInt(temporaryDeckTransitionArray[i])
              );
            }
          }

          console.log("done fetching and cleaning data");
          this.dataReady = true;

          // if (location.hostname.toString() !== "localhost") {
          //   this.$mixpanel.track("Visit Game Session", {
          //     game_name: this.customOptions.gameTitle ?? "untitled",
          //     session_url: location.hostname.toString() + this.$route.fullPath,
          //     format: "Shuffled",
          //   });
          // }

          if (this.firebaseReady && this.roomInfo.cardSequence.length < 4) {
            this.shuffleAndResetGame();
          } else if (
            this.roomInfo.cardSequence.length !== this.gSheet.length &&
            this.firebaseReady
          ) {
            this.firebaseCacheError = true;
          } else if (this.firebaseReady) {
            this.firebaseCacheError = false;
          }
        })
        .catch((error) => {
          this.gSheet = [
            {
              ordered: 0,
              headerText: "Error",
              bodyText:
                "Error loading the Google Sheet. Please make sure that the link is correct and that it is publicly viewable",
            },
          ];

          this.orderedCards = this.gSheet;
          this.error = error;
          console.log(error.message, error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.shuffled {
  margin: auto;
  padding-top: 1em;
  padding-bottom: 1em;
}

@media (max-width: 576px) {
  h1,
  h2 {
    font-size: 1.7em;
  }

  .card-body {
    font-size: 1.2em;
    min-height: 11em;
  }
}

@media (min-width: 576px) {
  .card-body {
    font-size: 1.5em;
    min-height: 11em;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.x-card-text {
  font-size: 0.5em;
  text-decoration: underline;
}

.full-page-background {
  position: absolute;
  height: 100%;
  width: 100vw;
  top: 0;
  right: 0;
  margin: 0;
  z-index: -1;
}
</style>
