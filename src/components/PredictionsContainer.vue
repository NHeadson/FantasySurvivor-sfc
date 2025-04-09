<script>
import PlayersListComponent from './PlayersListComponent.vue';
import FormComponent from './FormComponent.vue';

export default {
  name: "PredictionsContainer",
  components: {
    PlayersListComponent,
    FormComponent,
  },
  data() {
    return {
      selectedPreMergePlayers: [],
      firstAdvantagePlayer: '',
      // Temporary list of player IDs for testing
      tempSelectedPreMergePlayers: [1, 2, 3, 4, 5, 6],
    };
  },
  props: {
    currentTab: {
      type: String,
      required: true,
    },
    players: {
      type: Array,
      required: true,
    },
  },
  computed: {
    showPreMergeContent() {
      return this.currentTab === 'preMerge';
    },
    showSeasonContent() {
      return this.currentTab === 'seasonLong';
    },
    showEndGameContent() {
      return this.currentTab === 'endGame';
    },
    isPreMergeSelectionValid() {
      return this.selectedPreMergePlayers.length === 6;
    },
    isPreMergeSelectionInvalid() {
      return this.selectedPreMergePlayers.length > 6;
    },
  },
  methods: {
    confirmPreMerge() {
      if (this.isPreMergeSelectionValid) {
        this.$emit('update:currentTab', 'seasonLong');
      }
    },
    confirmSeasonLong() {
      this.$emit('update:currentTab', 'endGame');
    },
    confirmAllPredictions() {
      this.$emit('confirm-predictions');
    },
    handleConfirmPredictions() {
      this.confirmAllPredictions();
      this.$emit('predictionsConfirmed');
      this.$emit('changePage', 'RecordContainer');
    },
    updatePlayer(updatedPlayer) {
      const index = this.players.findIndex(
        (player) => player.id === updatedPlayer.id
      );
      if (index !== -1) {
        this.$set(this.players, index, updatedPlayer);
      }
    },
    togglePreMergeSelection(playerId) {
      const index = this.selectedPreMergePlayers.indexOf(playerId);
      if (index === -1) {
        this.selectedPreMergePlayers.push(playerId);
      } else {
        this.selectedPreMergePlayers.splice(index, 1);
      }
    },
    handleFirstAdvantageChange(event) {
      this.firstAdvantagePlayer = event.target.value;
    },
  },
  mounted() {
    // Pre-select 6 players for testing
    this.selectedPreMergePlayers = [...this.tempSelectedPreMergePlayers];
  }
}

</script>

<!-- HTML -->
<template>
  <div class="card outer-card bg-secondary bg-gradient">
    <div class="card-body">
      <h3 class="card-title">
        <strong>Predictions</strong>
      </h3>
      <!-- Inner Card -->
      <div class="col-11 m-auto">
        <div class="card inner-card">
          <div class="card-body p-2">
            <!-- Nav Tabs -->
            <ul class="nav nav-tabs p-1 justify-content-left tabs-container">
              <!--Pre-merge tab-->
              <li class="nav-item" role="presentation">
                <a class="nav-link bg-gradient" :class="{ active: currentTab === 'preMerge' }" data-bs-toggle="tab"
                  data-bs-target="#pre-merge-tab-pane" type="button" role="tab"
                  @click="$emit('update:currentTab', 'preMerge')">Pre-Merge</a>
              </li>
              <!--Season-long tab-->
              <li class="nav-item" role="presentation">
                <a class="nav-link bg-gradient"
                  :class="{ active: currentTab === 'seasonLong', disabled: currentTab !== 'seasonLong' && currentTab !== 'endGame' }"
                  data-bs-toggle="tab" data-bs-target="#season-long-tab-pane" type="button" role="tab"
                  @click="$emit('update:currentTab', 'seasonLong')">Season-Long</a>
              </li>
              <!--End Game tab-->
              <li class="nav-item" role="presentation">
                <a class="nav-link bg-gradient"
                  :class="{ active: currentTab === 'endGame', disabled: currentTab !== 'endGame' }" data-bs-toggle="tab"
                  data-bs-target="#end-game-tab-pane" type="button" role="tab"
                  @click="$emit('update:currentTab', 'endGame')">End Game</a>
              </li>
            </ul>
            <!-- Tab Content -->
            <div class="py-2 px-4">
              <!--Pre-merge content-->
              <div v-if="showPreMergeContent" class="tab-pane fade active show" role="tabpanel"
                aria-labelledby="pre-merge-tab" tabindex="0">
                <h5 class="mt-1 text-center">
                  Select 6 Players to be Eliminated <em>before the merge</em>
                </h5>
                <form-component :submit-btn-text="'Confirm Pre-Merge'" :show-submit-button="true"
                  :submit-action="confirmPreMerge">
                  <template v-slot>
                    <div class="row py-1 px-1">
                      <div class="col-4 py-1" v-for="player in players" :key="player.id">
                        <div class="form-check text-left">
                          <input class="pre-merge-checkbox form-check-input" type="checkbox" :value="player.id"
                            :id="'pre-merge-' + player.id" v-model="selectedPreMergePlayers" />
                          <label class="form-check-label" :for="'pre-merge-' + player.id">
                            {{ player.name }}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="row pt-2 pb-1">
                      <div class="col">
                        <p id="invalid" class="text-center text-danger fs-6" v-if="isPreMergeSelectionInvalid">
                          *You have selected too many players*
                        </p>
                      </div>
                    </div>
                  </template>
                </form-component>
              </div>
              <!--Season-long content-->
              <div v-if="showSeasonContent" class="tab-pane fade active show" id="season-long-tab-pane"
                role="tabpanel" aria-labelledby="season-long-tab" tabindex="0">
                <h5 class="mt-1 text-center">
                  Will Any of the Following Occur?
                </h5>
                <form-component :submit-btn-text="'Next Tab'" :show-submit-button="true"
                  :submit-action="confirmSeasonLong">
                  <template v-slot>
                    <div class="row" id="first-adv-container">
                      <div class="col">
                        <div class="row px-1">
                          <div class="col-6 py-1">
                            <label for="first-adv-selection" class="form-label">Who will be the first to play an idol or
                              advantage?</label>
                          </div>
                          <div class="col-auto m-auto">
                            <select id="first-adv-selection" class="form-select" v-model="firstAdvantagePlayer"
                              @change="handleFirstAdvantageChange">
                              <option value="">Select...</option>
                              <option v-for="player in players" :value="player.id">{{ player.name }}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row" id="first-adv-follow-up" v-if="firstAdvantagePlayer">
                      <div class="col">
                        <div class="row px-1">
                          <div class="col-6 py-1">
                            <label class="form-label">Will they play it correctly or waste
                              it?</label>
                          </div>
                          <br />
                          <div class="col-auto m-auto">
                            <div class="form-check text-center">
                              <input class="form-check-input" type="radio" name="first-adv-radio"
                                id="checkbox-correct" />
                              <label class="form-check-label" for="checkbox-correct">Correctly Played</label>
                            </div>
                            <div class="form-check text-center">
                              <input class="form-check-input" type="radio" name="first-adv-radio"
                                id="checkbox-incorrect" />
                              <label class="form-check-label" for="checkbox-incorrect">Wasted</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 1st Tribe Swap Qty -->
                    <div class="row">
                      <div class="col">
                        <div class="row">
                          <div class="col-6">
                            <p>
                              For the first tribe swap: Will the number of tribes be changed?
                            </p>
                          </div>
                          <div class="col-auto m-auto">
                            <div class="form-check text-center">
                              <input class="form-check-input" type="radio" name="radio-merge-tribes"
                                id="radio-merge-yes" />
                              <label class="form-check-label" for="radio-merge-yes">
                                Yes
                              </label>
                            </div>
                            <div class="form-check text-center">
                              <input class="form-check-input" type="radio" name="radio-merge-tribes"
                                id="radio-merge-No" />
                              <label class="form-check-label" for="radio-merge-No">
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Shot in the dark -->
                    <div class="row">
                      <div class="col">
                        <div class="row">
                          <div class="col-6">
                            <p>
                              Will there be a successful shot-in-the-dark
                              played?
                            </p>
                          </div>
                          <div class="col-auto m-auto">
                            <div class="form-check text-center">
                              <input class="form-check-input" type="radio" name="radio-sitd" id="radio-sitd-yes" />
                              <label class="form-check-label" for="radio-sitd-yes">
                                Yes
                              </label>
                            </div>
                            <div class="form-check text-center">
                              <input class="form-check-input" type="radio" name="radio-sitd" id="radio-sitd-no" />
                              <label class="form-check-label" for="radio-sitd-no">
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Rock Draw -->
                    <div class="row">
                      <div class="col">
                        <div class="row">
                          <div class="col-6">
                            <p>Will there be a rock draw tie-breaker?</p>
                          </div>
                          <div class="col-auto m-auto">
                            <div class="form-check text-center">
                              <input class="form-check-input" type="radio" name="radio-rock-draw"
                                id="radio-rock-draw-yes" />
                              <label class="form-check-label" for="radio-rock-draw-yes">
                                Yes
                              </label>
                            </div>
                            <div class="form-check text-center">
                              <input class="form-check-input" type="radio" name="radio-rock-draw"
                                id="radio-rock-draw-no" />
                              <label class="form-check-label" for="radio-rock-draw-no">
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </form-component>
              </div>
              <!--End game content-->
              <div v-if="showEndGameContent" class="tab-pane fade active show py-1" id="end-game-tab-pane"
                role="tabpanel" aria-labelledby="end-game-tab" tabindex="0">
                <h5 class="text-center mb-5">
                  End of Season Guesses
                </h5>
                <form-component :submit-action="confirmAllPredictions" :show-submit-button="true"
                  :submitBtnText="'Lock-In Predictions'" modalToggle="modal" modalTarget="#setGuessesModal">
                  <template v-slot>
                    <!-- Winner -->
                    <div class="row py-1">
                      <div class="col">
                        <div class="row">
                          <div class="col-7 m-auto">
                            <label for="winner-selection" class="form-label">Who will be the winner and Sole Survivor of
                              this season?</label>
                          </div>
                          <div class="col-auto m-auto">
                            <select id="winner-selection" class="form-select">
                              <option value="">Select...</option>
                              <option v-for="player in players" :value="player.id">{{ player.name }}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Final 2/3 -->
                    <div class="row py-1">
                      <div class="col">
                        <div class="row">
                          <div class="col-8 m-auto">
                            <p>Will there be a final 2 or a final 3?</p>
                          </div>
                          <div class="col-auto m-auto">
                            <div class="form-check text-center">
                              <input class="form-check-input" type="radio" name="final-2-3-radio" id="final-2-radio" />
                              <label class="form-check-label" for="final-2-radio">
                                Final 2
                              </label>
                            </div>
                            <div class="form-check text-center">
                              <input class="form-check-input" type="radio" name="final-2-3-radio" id="final-3-radio" />
                              <label class="form-check-label" for="final-3-radio">
                                Final 3
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Immunity Winner Fire Challenge -->
                    <div class="row py-1 mb-2">
                      <div class="col">
                        <div class="row">
                          <div class="col-8 m-auto">
                            <p>
                              Will the final immunity winner opt to compete
                              in fire making challenge?
                            </p>
                          </div>
                          <div class="col-auto m-auto">
                            <div class="form-check text-center">
                              <input class="form-check-input" type="radio" name="fm-challenge" id="fm-challenge-yes" />
                              <label class="form-check-label" for="fm-challenge-yes">
                                Yes
                              </label>
                            </div>
                            <div class="form-check text-center">
                              <input class="form-check-input" type="radio" name="fm-challenge" id="fm-challenge-no" />
                              <label class="form-check-label" for="fm-challenge-no">
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </form-component>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  Modal  -->
      <div class="modal fade" id="setGuessesModal" tabindex="-1" aria-labelledby="setGuessesModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="setGuessesModalLabel">Confirm Predictions?</h1>
              <button type="button" class="btn-close bg-gradient" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>This will lock in your choices. <br /><strong>You will not be able to undo this process.</strong></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary bg-gradient" data-bs-dismiss="modal">Close</button>
              <button @click="handleConfirmPredictions" id="conf-modal-btn" class="btn btn-primary bg-gradient"
                data-bs-dismiss="modal">Confirm Guesses</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- STYLES -->
<style scoped></style>