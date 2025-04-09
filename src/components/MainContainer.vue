<script>
  import HomeContainer from './HomeContainer.vue';
  import CastContainer from './CastContainer.vue';
  import PredictionsContainer from './PredictionsContainer.vue';
  import RecordContainer from './RecordContainer.vue';
  import OverviewContainer from './OverviewContainer.vue';

  export default {
    name: "MainContainer",
    components: {
    HomeContainer,
    CastContainer,
    PredictionsContainer,
    RecordContainer,
    OverviewContainer,
  },
  props: {
    currentPage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tribeQtySet: false,
      currentTab: 'preMerge',
      players: [],
      isNewSeason: true,
      correctPredictions: 0,
      incorrectPredictions: 0,
      pendingPredictions: 0,
      detailedPredictions: [],
      predictionsConfirmed: false,
    };
  },
  methods: {
    changePage(page) {
      this.$emit('update:currentPage', page);
    },
    updateTribeQtySet(value) {
      this.tribeQtySet = value;
    },
    updateCurrentTab(tab) {
      this.currentTab = tab;
    },
    updatePlayers(players) {
      this.players = players;
    },
    handlePredictionsConfirmed() {
      this.isNewSeason = false;
      this.predictionsConfirmed = true;
      this.changePage('HomeContainer');
    },
    updatePredictions(predictionData) {
      const { lastEliminated, foundAdvantages, playedAdvantages, nextEliminated, nextFoundAdvantage, nextAdvantagePlayed } = predictionData;

      this.detailedPredictions.push({
        id: this.detailedPredictions.length + 1,
        prediction: `Elimination - ${lastEliminated}`,
        outcome: 'Pending',
        points: 0,
      });

      this.pendingPredictions = this.detailedPredictions.filter(prediction => prediction.outcome === 'Pending').length;

      if (lastEliminated === nextEliminated) {
        this.correctPredictions += 1;
        this.detailedPredictions[this.detailedPredictions.length - 1].outcome = 'Correct';
        this.detailedPredictions[this.detailedPredictions.length - 1].points = 10;
      } else {
        this.incorrectPredictions += 1;
        this.detailedPredictions[this.detailedPredictions.length - 1].outcome = 'Incorrect';
      }

      this.pendingPredictions = this.detailedPredictions.filter(prediction => prediction.outcome === 'Pending').length;
    }
  }
}

</script>

<!-- HTML -->
<template>
  <div class="col-11 col-md-10 m-auto">
      <home-container 
        v-if="currentPage === 'HomeContainer'"
        :is-new-season="isNewSeason"
        @changePage="changePage"></home-container>

      <cast-container v-if="currentPage === 'CastContainer' && !predictionsConfirmed"
        :tribeQtySet="tribeQtySet"
        @updateTribeQtySet="updateTribeQtySet"
        @update:players="updatePlayers"
        @changePage="changePage"></cast-container>

      <predictions-container v-if="currentPage === 'PredictionsContainer' && !predictionsConfirmed"
        :players="players"
        :currentTab="currentTab"
        @update:currentTab="updateCurrentTab"
        @changePage="changePage"
        @predictionsConfirmed="handlePredictionsConfirmed"></predictions-container>

      <record-container v-if="currentPage === 'RecordContainer'"
        :players="players"
        @changePage="changePage"
        @updatePredictions="updatePredictions"></record-container>

      <overview-container v-if="currentPage === 'OverviewContainer'"
        :correct-predictions="correctPredictions"
        :incorrect-predictions="incorrectPredictions"
        :pending-predictions="pendingPredictions"
        :detailed-predictions="detailedPredictions"
        @changePage="changePage"></overview-container>
      
    </div>
</template>


<!-- STYLES -->
<style scoped>

</style>