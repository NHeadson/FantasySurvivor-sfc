<script>
  export default {
    name: "NavBarComponent",
    props: {
    currentPage: {
      type: String,
      required: true,
    },
    predictionsConfirmed: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isStickyBottom: window.innerWidth < 850,
    };
  },
  computed: {
    navbarClasses() {
      return {
        'sticky-bottom': this.isStickyBottom,
        'mt-1': this.isStickyBottom,
        'navbar-top': !this.isStickyBottom,
        'mt-1': !this.isStickyBottom,
        'w-100': true,
      };
    },
  },
  methods: {
    navigate(page) {
      this.$emit('navigate', page);
    },
    handleResize() {
      this.isStickyBottom = window.innerWidth < 850;
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
  }

</script>

<!-- HTML -->
<template>
  <nav :class="['bg-dark', 'pt-2', 'pb-2', navbarClasses]">
      <ul class="nav justify-content-center ms-5 me-5">
        <li class="nav-item m-auto">
          <a @click="navigate('HomeContainer')" class="nav-link" :class="{ active: currentPage === 'HomeContainer' }" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-house-door"
              viewBox="0 0 16 16"
            >
              <path
                d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"
              />
            </svg>
          </a>
        </li>
        <li v-if="!predictionsConfirmed" class="nav-item m-auto">
          <a @click="navigate('CastContainer')" class="nav-link" :class="{ active: currentPage === 'CastContainer' }" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-people"
              viewBox="0 0 16 16"
            >
              <path
                d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
              />
            </svg>
          </a>
        </li>
        <li v-if="!predictionsConfirmed" class="nav-item m-auto">
          <a @click="navigate('PredictionsContainer')" class="nav-link" :class="{ active: currentPage === 'PredictionsContainer' }" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-patch-question"
              viewBox="0 0 16 16"
            >
              <path
                d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745"
              />
              <path
                d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"
              />
              <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
            </svg>
          </a>
        </li>
        <li class="nav-item m-auto">
          <a @click="navigate('RecordContainer')" class="nav-link" :class="{ active: currentPage === 'RecordContainer' }" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-clipboard"
              viewBox="0 0 16 16"
            >
              <path
                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"
              />
              <path
                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"
              />
            </svg>
          </a>
        </li>
        <li class="nav-item m-auto">
          <a @click="navigate('OverviewContainer')" class="nav-link" :class="{ active: currentPage === 'OverviewContainer' }" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-pie-chart"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793zm1 0V7.5h6.482A7 7 0 0 0 8.5 1.018M14.982 8.5H8.207l-4.79 4.79A7 7 0 0 0 14.982 8.5M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
</template>


<!-- STYLES -->
<style scoped>

</style>