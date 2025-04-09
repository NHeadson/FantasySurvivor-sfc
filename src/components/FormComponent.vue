<script>
export default {
  name: "FormComponent",
  props: {
    submitBtnText: {
      type: String,
      required: true,
      default: '',
    },
    submitAction: {
      type: Function,
      required: true,
    },
    showSubmitButton: {
      type: Boolean,
      default: true,
    },
    modalToggle: {
      type: String,
      default: '', 
    },
    modalTarget: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleSubmit() {
      this.submitAction();
    },
  }
}

</script>

<!-- HTML -->
<template>
  <form @submit.prevent="handleSubmit">
    <slot></slot>
    <div v-if="showSubmitButton" style="display: flex; justify-content: center;">
      <button
        type="submit"
        class="btn btn-primary bg-gradient"
        :data-bs-toggle="modalToggle || null"
        :data-bs-target="modalTarget || null"
      >
        <strong>{{ submitBtnText }}</strong>
      </button>
    </div>
  </form>
</template>


<!-- STYLES -->
<style scoped></style>