<script>
import PlayersListComponent from './PlayersListComponent.vue';
import FormComponent from './FormComponent.vue';

export default {
  name: "CastContainer",
  components: {
    PlayersListComponent,
    FormComponent,
  },
  data() {
    return {
      players: [],
      tribes: [],
      totalPlayers: 0,
      totalTribes: 0,
      showTribeModal: false,
      selectedTribe: null,
      errorMessage: '',
      // Temporary names for testing
      tempNames: [
        'John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Davis',
        'David Wilson', 'Eve White', 'Frank Black', 'Grace Green', 'Hank Blue',
        'Ivy Red', 'Jack Yellow', 'Kara Orange', 'Liam Purple', 'Mia Pink',
        'Noah Gray', 'Olivia Cyan', 'Paul Magenta', 'Quinn Lime', 'Ryan Teal',
        'Sophia Violet', 'Tom Indigo', 'Uma Gold', 'Victor Silver'
      ],
    };
  },
  props: {
    tribeQtySet: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    showTribeQtyForm() {
      return !this.tribeQtySet;
    },
    showSetCastForm() {
      return this.tribeQtySet;
    },
    allPlayersNamed() {
      return this.players.every(player => player.name.trim() !== '');
    },
    allTribesNamed() {
      return this.tribes.every(tribe => tribe.name.trim() !== '');
    },
    allTribesColored() {
      return this.tribes.every(tribe => tribe.color.trim() !== '');
    },
    canConfirmPlayers() {
      return this.allPlayersNamed && this.allTribesNamed && this.allTribesColored;
    },
  },
  methods: {
    setTribeQty(e) {
      this.errorMessage = '',
        this.totalPlayers = parseInt(document.getElementById('total-players').value);
      this.totalTribes = parseInt(document.getElementById('total-tribes').value);

      if (this.totalPlayers > 24) {
        this.errorMessage = 'The maximum number of players is 24.';
        return;
      }

      if (this.totalTribes > 4) {
        this.errorMessage = 'The maximum number of tribes is 4.';
        return;
      }

      this.createPlayersList();
      this.createTribes();
      this.$emit('updateTribeQtySet', true);
    },
    createPlayersList() {
      this.players = Array.from({ length: this.totalPlayers }, (_, i) => ({
        id: i + 1,
        name: this.tempNames[i] || '',   // Temp names used
        tribe: Math.floor(i / (this.totalPlayers / this.totalTribes)) + 1,
        advantagesHeld: 0,
        advantagesPlayed: 0,
        eliminated: false,
      }));
      this.$emit('update:players', this.players);
    },
    createTribes() {
      this.tribes = Array.from({ length: this.totalTribes }, (_, i) => ({
        id: i + 1,
        name: `Tribe ${i + 1}`,
        color: '#000000',
      }));
    },
    setRoster() {
      this.$emit('changePage', 'PredictionsContainer');
    },
    openTribeModal(tribe) {
      this.selectedTribe = tribe;
      this.showTribeModal = true;
    },
    saveTribeDetails() {
      this.showTribeModal = false;
    },
  }
}

</script>

<!-- HTML -->
<template>
  <div class="card outer-card bg-secondary bg-gradient">
    <div class="card-body">
      <h3 class="card-title"><strong>Cast</strong></h3>
      <!-- Tribes Content -->
      <div v-if="showTribeQtyForm" class="col-10 col-md-9 m-auto">
        <div class="card inner-card">
          <div class="card-body mt-4">
            <h3 class="mt-3 text-center">Enter Starting Tribes:</h3>
            <form-component :submit-btn-text="'Confirm Pre-Merge'" :show-submit-button="true"
              :submit-action="setTribeQty">
              <template v-slot>
                <div class="row mt-5 mb-5 g-1">
                  <div class="col-7 col-md-6 m-auto">
                    <label for="total-players" class="col-form-label">
                      How many total <em>players</em>?
                    </label>
                  </div>
                  <div class="col-3 col-md-2 m-auto">
                    <input type="number" class="form-control" id="total-players" value="18" />
                  </div>
                </div>

                <div class="row mb-5 g-1">
                  <div class="col-7 col-md-6 m-auto">
                    <label for="total-tribes" class="col-form-label">
                      How many total <em>tribes</em>?
                    </label>
                  </div>
                  <div class="col-3 col-md-2 m-auto">
                    <input type="number" class="form-control" id="total-tribes" value="3" />
                  </div>
                </div>
                <div v-if="errorMessage" class="row mt-3">
                  <div class="col text-center text-danger">
                    {{ errorMessage }}
                  </div>
                </div>
              </template>
            </form-component>
          </div>
        </div>
      </div>
      <!-- Players Content -->
      <div v-else class="col-10 col-md-9 m-auto">
        <!--=============  Carousel  =====================-->
        <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner">
            <div v-for="(tribe, index) in tribes" :key="tribe.id" :class="['carousel-item', { active: index === 0 }]">
              <div class="card">
                <h4 class="text-center pt-2">
                  {{ tribe.name }}
                  <button @click="openTribeModal(tribe)" class="btn btn-sm btn-secondary">Edit</button>
                </h4>
                <players-list-component :players="players" :tribe-id="tribe.id"></players-list-component>
                <div class="row">
                  <div class="col-auto py-3 m-auto">
                    <button id="confirm-roster" class="btn btn-primary bg-gradient" :disabled="!canConfirmPlayers"
                      @click="setRoster">
                      <strong>Confirm All Players?</strong>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Tribe Modal -->
    <div v-if="showTribeModal" class="modal" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Tribe</h5>
            <button type="button" class="btn-close" @click="showTribeModal = false"></button>
          </div>
          <div class="row modal-body">
            <div class="col-4 ms-5 me-4 mb-3">
              <label for="tribe-name" class="form-label">Tribe Name</label>
              <input type="text" class="form-control" id="tribe-name" v-model="selectedTribe.name">
            </div>
            <div class="col-3 me-5 ms-5 mb-3">
              <label for="tribe-color" class="form-label">Tribe Color</label>
              <input type="color" class="form-control" id="tribe-color" v-model="selectedTribe.color">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showTribeModal = false">Close</button>
            <button type="button" class="btn btn-primary" @click="saveTribeDetails">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- STYLES -->
<style scoped></style>