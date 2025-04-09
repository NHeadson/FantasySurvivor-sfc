<script>
  export default {
    name: "HomeContainer",
    props: {
    isNewSeason: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    beginSeason() {
      this.$emit('changePage', 'CastContainer');
    },
  }
}

</script>

<!-- HTML -->
<template>
  <div class="card outer-card bg-secondary bg-gradient">
      <div v-if="isNewSeason" id="home-begin" class="card-body">
        <h3 class="card-title">Welcome!</h3>
        <div class="col-10 col-md-9 m-auto">
          <div class="card inner-card">
            <div class="card-body">
              <p class="card-text">
                To begin a new season, click below to begin planning!
              </p>
              <p class="card-text">
                You'll be able to enter in each player and make
                predictions for the season!
              </p>
              <p class="card-text">
                Be sure to record the results of each episode so you
                can be up to date on your progress.
              </p>
            </div>
          </div>
        </div>
        <div class="row py-1">
          <div class="col-auto mt-2 m-auto">
            <button
              id="begin-button"
              class="btn btn-primary bg-gradient"
              @click="beginSeason"
            >
              <strong>Begin Season</strong>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="card-body">
        <h3 class="card-title pb-2 ps-2">Welcome Back!</h3>
        <hr />
        <div class="col-10 col-md-9 m-auto">
          <div class="card">
            <div class="card-body">
              <p class="card-text">
                To continue your current season, click below to log
                new episode!
              </p>
              <p class="card-text">
                After you watch each episode, remember to log the
                details and make your guesses for the following week!
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-auto mt-3 m-auto">
            <button
              id="resume-button"
              class="btn btn-primary bg-gradient"
            >
              <strong>Resume Current Season</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>


<!-- STYLES -->
<style scoped>

</style>