<script>
import NavBarComponent from '@/components/NavBarComponent.vue';
import MainContainer from '@/components/MainContainer.vue';
import PlayersListComponent from '@/components/PlayersListComponent.vue';
import ListItemComponent from '@/components/ListItemComponent.vue';

export default {
  components: {
    NavBarComponent,
    MainContainer,
    PlayersListComponent,
    ListItemComponent,
  },
  data() {
    return {
      currentPage: 'HomeContainer', // Default page
      predictionsConfirmed: false,
    };
  },
  methods: {
    navigate(page) {
      this.currentPage = page;
    },
    confirmPredictions() {
      this.predictionsConfirmed = true;
    },
    handleConfirmPredictions() {
      this.confirmAllPredictions();
      this.confirmPredictions();
      this.navigate('RecordContainer');
    },
  }
}

</script>

<!-- HTML -->
<template>
  <main-container :current-page="currentPage" @update:current-page="navigate"></main-container>
  <nav-bar-component :current-page="currentPage" :predictions-confirmed="predictionsConfirmed"
    @navigate="navigate"></nav-bar-component>
</template>

<!-- STYLES -->
<style scoped></style>
