<script>
  export default {
    name: "OverviewContainer",
    props: {
    correctPredictions: {
      type: Number,
      required: true,
    },
    incorrectPredictions: {
      type: Number,
      required: true,
    },
    pendingPredictions: {
      type: Number,
      required: true,
    },
    detailedPredictions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    hasRecordedPredictions() {
      return this.detailedPredictions.length > 0;
    },
    totalGuesses() {
      return this.detailedPredictions.length;
    },
  }
  }

</script>

<!-- HTML -->
<template>
  <div class="card outer-card bg-secondary bg-gradient">
      <div class="card-body">
        <h3 class="card-title">
          <strong>Overview</strong>
        </h3>
        <div class="card inner-card">
          <div class="card-body">
            <!-- Generalized Progress Summary -->
            <div id="progress-summary" class="mb-4">
              <h4 class="text-center">Progress Summary</h4>
              <div class="row text-center">
                <div class="col">
                  <h5>Correct Predictions</h5>
                  <p id="correct-predictions">{{ correctPredictions }}</p>
                </div>
                <div class="col">
                  <h5>Incorrect Predictions</h5>
                  <p id="incorrect-predictions">{{ incorrectPredictions }}</p>
                </div>
                <div class="col">
                  <h5>Pending Predictions</h5>
                  <p id="pending-predictions">{{ totalGuesses }}</p>
                </div>
              </div>
            </div>
            <hr v-if="hasRecordedPredictions" />
            <!-- Detailed Predictions Overview -->
            <div id="detailed-overview" class="mb-4" v-if="hasRecordedPredictions">
              <h4 class="text-center">Detailed Predictions Overview</h4>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Prediction</th>
                    <th scope="col">Outcome</th>
                    <th scope="col">Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="prediction in detailedPredictions" :key="prediction.id">
                    <td>{{ prediction.prediction }}</td>
                    <td>{{ prediction.outcome }}</td>
                    <td>{{ prediction.points }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<!-- STYLES -->
<style scoped>

</style>