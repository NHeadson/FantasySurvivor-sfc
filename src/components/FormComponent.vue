<script>
import SubmitButton from './SubmitButton.vue';

export default {
  name: "FormComponent",
  components: {
    SubmitButton,
  },
  props: {
    submitAction: {
      type: Function,
      required: true,
    },
    showSubmitButton: {
      type: Boolean,
      default: true,
    },
    submitBtnText: {
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
  methods: {
    handleSubmit() {
      this.submitAction();
    },
  },
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <slot></slot>
    <div v-if="showSubmitButton" class="text-end">
      <submit-button
        :text="submitBtnText"
        :modalToggle="modalToggle"
        :modalTarget="modalTarget"
      />
    </div>
  </form>
</template>

<style scoped></style>
