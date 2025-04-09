<script>
  export default {
    name: "ListItemComponent",
    props: {
      player: {
        type: Object,
        required: true,
      },
    },
  };
</script>


<!-- HTML -->
<template>
  <div>
    {{ player.name }}
  </div>
</template>


<!-- STYLES -->
<style scoped>

</style>