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
    toggleNextEpisodeForm() {
      this.nextEpisodeFormVisible = !this.nextEpisodeFormVisible;
    },
    logNewEpisode() {
      this.toggleLastEpisodeForm();
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
      this.toggleNextEpisodeForm();
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

      this.$emit('changePage', 'OverviewContainer');
    },
    handlePlayedAdvantagesChange(event) {
      this.showPlayedAdvantagesForm = event.target.value === 'yes';
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
          <div id="log-new-ep-container" class="" v-if="!lastEpisodeFormVisible && !nextEpisodeFormVisible">
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
            <h5 class="text-center">Enter Info From Last Episode</h5>
            <div class="row">
              <div class="col-6 ps-4">
                <label for="last-eliminated" class="col-form-label">
                  Who was eliminated from the game?
                </label>
              </div>
              <div class="col-auto m-auto">
                <select id="last-eliminated" class="form-select" v-model="lastEliminated">
                  <option value="">Select...</option>
                  <option v-for="player in playersStillPlaying" :value="player.id">{{ player.name }}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-6 ps-4">
                <p>Was a tie-breaking rock draw done?</p>
              </div>
              <div class="col-auto m-auto">
                <div class="form-check text-center">
                  <input class="form-check-input" type="radio" name="log-rock-draw" id="log-rock-draw-yes"
                    value="yes" />
                  <label class="form-check-label" for="log-rock-draw-yes">
                    Yes
                  </label>
                </div>
                <div class="form-check text-center">
                  <input class="form-check-input" type="radio" name="log-rock-draw" id="log-rock-draw-no" value="no" />
                  <label class="form-check-label" for="log-rock-draw-no">
                    No
                  </label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 text-start">
                <label for="found-advantage" class="col-form-label">
                  Select any players who <strong>found</strong> an
                  idol/advantage:
                </label>
              </div>
              <div class="col ps-4 pe-4">
                <div class="row pt-1">
                  <div class="col-4" v-for="player in playersStillPlaying" :key="player.id">
                    <div class="form-check text-center">
                      <input class="found-advantage-checkbox form-check-input" type="checkbox" :value="player.id"
                        :id="player.id + '-found-advantage'" v-model="foundAdvantages" />
                      <label class="form-check-label" :for="player.id + '-found-advantage'">
                        {{ player.name }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6 ps-4">
                <p>
                  Were any idols/advantages <strong>played</strong>?
                </p>
              </div>
              <div class="col-auto m-auto">
                <div class="form-check text-center">
                  <input class="form-check-input" type="radio" name="radio-adv-played" id="radio-adv-played-yes"
                    value="yes" @change="handlePlayedAdvantagesChange" />
                  <label class="form-check-label" for="radio-adv-played-yes">
                    Yes
                  </label>
                </div>
                <div class="form-check text-center">
                  <input class="form-check-input" type="radio" name="radio-adv-played" id="radio-adv-played-no"
                    value="no" @change="handlePlayedAdvantagesChange" />
                  <label class="form-check-label" for="radio-adv-played-no">
                    No
                  </label>
                </div>
              </div>
            </div>
            <!--    displays only if above is YES    -->
            <div class="row" v-if="showPlayedAdvantagesForm">
              <div class="col-12 text-start">
                <label for="played-advantage" class="col-form-label">
                  Select all players who <strong>played</strong> an
                  idol/advantage:
                </label>
              </div>
              <div class="col ps-4 pe-4">
                <div class="row pt-1">
                  <div class="col-4" v-for="player in playersStillPlaying" :key="player.id">
                    <div class="form-check text-center">
                      <input class="played-advantage-checkbox form-check-input" type="checkbox" :value="player.id"
                        :id="player.id + '-played-advantage'" v-model="playedAdvantages" />
                      <label class="form-check-label" :for="player.id + '-played-advantage'">
                        {{ player.name }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3 mb-1 justify-content-end">
              <div class="col-5 col-md-3">
                <button id="conf-log-episode-btn" class="btn btn-primary bg-gradient" type="button" @click="logEpisode">
                  <strong>Log Episode</strong>
                </button>
              </div>
            </div>
          </form>
          <!-- Next Episode Form -->
          <form id="next-episode-form" v-if="nextEpisodeFormVisible">
            <h5 class="text-center">Enter Guesses for Next Episode</h5>
            <div class="row">
              <div class="col-6 col-lg-4 ps-4">
                <label for="next-eliminated" class="col-form-label">
                  Who will be voted off <em>next</em> episode?
                </label>
              </div>
              <div class="col-auto m-auto">
                <select id="next-elimination" class="form-select" v-model="nextEliminated">
                  <option value="">Select...</option>
                  <option v-for="player in playersStillPlaying" :value="player.id">{{ player.name }}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-7 col-lg-5 ps-4">
                <label for="next-find-adv" class="col-form-label">
                  Select 1 player to <strong>find</strong> an idol or
                  advantage.
                </label>
              </div>
              <div class="col-auto mt-auto mb-auto">
                <select id="next-find-adv" class="form-select" v-model="nextFoundAdvantage">
                  <option value="">Select...</option>
                  <option v-for="player in playersStillPlaying" :value="player.id">{{ player.name }}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-7 col-lg-5 ps-4">
                <p>
                  Will an idol/advantage be <strong>played</strong>?
                </p>
              </div>
              <div class="col-auto ms-4 m-auto">
                <div class="form-check text-center">
                  <input class="form-check-input" type="radio" name="radio-next-adv-play" id="radio-next-adv-play-yes"
                    value="yes" v-model="nextAdvantagePlayed" />
                  <label class="form-check-label" for="radio-next-adv-play-yes">
                    Yes
                  </label>
                </div>
                <div class="form-check text-center">
                  <input class="form-check-input" type="radio" name="radio-next-adv-play" id="radio-next-adv-play-no"
                    value="no" v-model="nextAdvantagePlayed" />
                  <label class="form-check-label" for="radio-next-adv-play-no">
                    No
                  </label>
                </div>
              </div>
            </div>
            <div class="row mt-3 mb-1 justify-content-end">
              <div class="col-7 col-lg-5">
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