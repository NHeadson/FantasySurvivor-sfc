<script>
  import ListItemComponent from "@/components/ListItemComponent.vue"

  export default {
    name: "PlayersListComponent",
    components: {
    ListItemComponent,
  },
  props: {
    players: {
      type: Array,
      required: true,
    },
    tribeId: {
      type: Number,
      required: true,
    },
  }
  }

</script>

<!-- HTML -->
<template>
  <ul class="list-group list-group-flush p-4">
      <li
        v-for="player in players.filter(p => p.tribe === tribeId)"
        :key="player.id"
        class="list-group-item"
      >
        <div class="row">
          <input
            class="col-9 m-auto"
            type="text"
            v-model="player.name"
            placeholder="Player Name"
          />
        </div>
      </li>
    </ul>
</template>


<!-- STYLES -->
<style scoped>

</style>