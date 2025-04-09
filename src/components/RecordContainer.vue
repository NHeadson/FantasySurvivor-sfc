<script>
export default {
  name: "RecordContainer",
  props: {
    players: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      lastEpisodeFormVisible: false,
      nextEpisodeFormVisible: false,
      lastEliminated: '',
      foundAdvantages: [],
      playedAdvantages: [],
      nextEliminated: '',
      nextFoundAdvantage: '',
      nextAdvantagePlayed: '',
      showPlayedAdvantagesForm: false,
      answeredAdvantagesPlayed: false,
    };
  },
  computed: {
    playersStillPlaying() {
      return this.players.filter(player => !player.eliminated);
    },
  },
  methods: {
    toggleLastEpisodeForm() {
      this.lastEpisodeFormVisible = !this.lastEpisodeFormVisible;
    },
    logNewEpisode() {
      this.toggleLastEpisodeForm();
    },
    handlePlayedAdvantagesChange(event) {
      this.showPlayedAdvantagesForm = event.target.value === 'yes';
      this.answeredAdvantagesPlayed = true;
    },
    logEpisode() {
      console.log('Last Eliminated:', this.lastEliminated);
      console.log('Found Advantages:', this.foundAdvantages);
      console.log('Played Advantages:', this.playedAdvantages);
      const eliminatedPlayer = this.players.find(player => player.id === this.lastEliminated);
      if (eliminatedPlayer) {
        eliminatedPlayer.eliminated = true;
      }
      this.toggleLastEpisodeForm();
      this.nextEpisodeFormVisible = true;
    },
    lockInPredictions() {
      console.log('Next Eliminated:', this.nextEliminated);
      console.log('Next Found Advantage:', this.nextFoundAdvantage);
      console.log('Next Advantage Played:', this.nextAdvantagePlayed);

      this.$emit('updatePredictions', {
        lastEliminated: this.lastEliminated,
        foundAdvantages: this.foundAdvantages,
        playedAdvantages: this.playedAdvantages,
        nextEliminated: this.nextEliminated,
        nextFoundAdvantage: this.nextFoundAdvantage,
        nextAdvantagePlayed: this.nextAdvantagePlayed,
      });

      this.lastEliminated = '';
      this.foundAdvantages = [];
      this.playedAdvantages = [];
      this.nextEliminated = '';
      this.nextFoundAdvantage = '';
      this.nextAdvantagePlayed = '';
      this.showPlayedAdvantagesForm = false;
      this.nextEpisodeFormVisible = false;

      this.$emit('changePage', 'OverviewContainer');
    },
  }
}

</script>

<!-- HTML -->
<template>
  <div class="card outer-card bg-secondary bg-gradient">
    <div class="card-body">
      <h3 class="card-title">
        <strong>Episode Details Log</strong>
      </h3>
      <div class="card inner-card">
        <div class="card-body">
          <!-- Record Starting Page -->
          <div id="log-new-ep-container" v-if="!lastEpisodeFormVisible && !nextEpisodeFormVisible">
            <div class="">
              <h5 class="card-title p-5 my-5">
                **Make sure to watch the next episode
                <em>before</em> logging new info**
              </h5>
              <div class="row mt-5 justify-content-end">
                <div class="col-5 col-md-5">
                  <button id="log-new-ep-btn" class="btn btn-primary bg-gradient" @click="logNewEpisode">
                    <strong>Log New Episode</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Last Episode Form -->
          <form id="last-episode-form" v-if="lastEpisodeFormVisible">
            <!-- Step 1: Combined Questions -->
            <div v-if="!showPlayedAdvantagesForm">
              <!-- Last Eliminated -->
              <div class="row mb-3">
                <label for="last-eliminated" class="col-6 col-form-label text-end">
                  Who was eliminated from the game?
                </label>
                <div class="col-6">
                  <select id="last-eliminated" class="form-select" v-model="lastEliminated">
                    <option value="">Select...</option>
                    <option v-for="player in playersStillPlaying" :value="player.id" :key="player.id">
                      {{ player.name }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Found Advantages -->
              <div class="row mb-3">
                <label class="col-12 col-form-label text-center">
                  Select any players who <strong>found</strong> an idol/advantage:
                </label>
                <div class="col-12">
                  <div class="row">
                    <div class="col-6 col-md-4 col-lg-3 mb-2" v-for="player in playersStillPlaying" :key="player.id">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" :value="player.id"
                          :id="player.id + '-found-advantage'" v-model="foundAdvantages" />
                        <label class="form-check-label" :for="player.id + '-found-advantage'">
                          {{ player.name }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Were Any Idols Played -->
              <div class="row mb-3">
                <label class="col-6 col-form-label text-end">
                  Were any idols/advantages <strong>played</strong>?
                </label>
                <div class="col-6">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="radio-adv-played" id="radio-adv-played-yes"
                      value="yes" @change="handlePlayedAdvantagesChange" />
                    <label class="form-check-label" for="radio-adv-played-yes">Yes</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="radio-adv-played" id="radio-adv-played-no"
                      value="no" @change="handlePlayedAdvantagesChange" />
                    <label class="form-check-label" for="radio-adv-played-no">No</label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Played Advantages Details -->
            <div v-if="showPlayedAdvantagesForm">
              <div class="row mb-3">
                <label class="col-12 col-form-label text-center">
                  Select all players who <strong>played</strong> an idol/advantage:
                </label>
                <div class="col-12">
                  <div class="row">
                    <div class="col-6 col-md-4 col-lg-3 mb-2" v-for="player in playersStillPlaying" :key="player.id">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" :value="player.id"
                          :id="player.id + '-played-advantage'" v-model="playedAdvantages" />
                        <label class="form-check-label" :for="player.id + '-played-advantage'">
                          {{ player.name }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Log Episode Button -->
            <div class="row mt-4" v-if="answeredAdvantagesPlayed">
              <div class="col text-end">
                <button id="conf-log-episode-btn" class="btn btn-primary bg-gradient" type="button" @click="logEpisode">
                  <strong>Log Episode</strong>
                </button>
              </div>
            </div>
          </form>
          <!-- Next Episode Form -->
          <form id="next-episode-form" v-if="nextEpisodeFormVisible">
            <h5 class="text-center mb-4">Enter Predictions for Next Episode</h5>

            <!-- Next Eliminated -->
            <div class="row my-5">
              <label for="next-eliminated" class="col-6 col-form-label text-end">
                Who will be eliminated <em>next</em> episode?
              </label>
              <div class="col-6">
                <select id="next-eliminated" class="form-select" v-model="nextEliminated">
                  <option value="">Select...</option>
                  <option v-for="player in playersStillPlaying" :value="player.id" :key="player.id">
                    {{ player.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Next Found Advantage -->
            <div class="row mb-5">
              <label for="next-find-adv" class="col-6 col-form-label text-end">
                Select 1 player to <strong>find</strong> an idol or advantage:
              </label>
              <div class="col-6">
                <select id="next-find-adv" class="form-select" v-model="nextFoundAdvantage">
                  <option value="">Select...</option>
                  <option v-for="player in playersStillPlaying" :value="player.id" :key="player.id">
                    {{ player.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Next Played Advantage -->
            <div class="row mb-3">
              <label class="col-6 col-form-label text-end">
                Will an idol/advantage be <strong>played</strong>?
              </label>
              <div class="col-6">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="radio-next-adv-play" id="radio-next-adv-play-yes"
                    value="yes" v-model="nextAdvantagePlayed" />
                  <label class="form-check-label" for="radio-next-adv-play-yes">Yes</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="radio-next-adv-play" id="radio-next-adv-play-no"
                    value="no" v-model="nextAdvantagePlayed" />
                  <label class="form-check-label" for="radio-next-adv-play-no">No</label>
                </div>
              </div>
            </div>

            <!-- Lock-In Predictions Button -->
            <div class="row mt-4">
                <div class="col text-end">
                <button id="conf-next-episode-btn" class="btn btn-primary bg-gradient" type="button"
                  @click="lockInPredictions">
                  <strong>Lock-In Predictions</strong>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- STYLES -->
<style scoped></style>