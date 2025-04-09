<script>
export default {
  name: "SubmitButton",
  props: {
    text: {
      type: String,
      default: "Submit",
    },
    modalToggle: {
      type: String,
      default: "",
    },
    modalTarget: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <button
    type="button"
    class="btn btn-primary bg-gradient"
    :data-bs-toggle="modalToggle || null"
    :data-bs-target="modalTarget || null"
  >
    <strong>{{ text }}</strong>
  </button>
</template>

<style scoped></style>

