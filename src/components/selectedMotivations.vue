<template>
  <div class="motivations">
    <!-- Incoming motivations prop is passed as a string of the motivation.
    ViewPlan.vue loops through the array of motivations and calls on 
    selectedMotivations.vue for each motivation.-->
    <sui-button>
      <sui-image v-bind:src="imageSource()" alt="Labeled Motivation" />
      <span>{{ motivationName }}</span>
    </sui-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "selectedMotivations",
  props: ["motivationName", "motivationImage"],
  mounted() {},
  methods: {
    imageSource: function() {
      if (this.motivationImage != null) {
        var images = require.context("../assets/", false, /\.jpg$/);
        return images("./" + this.motivationImage + ".jpg");
      }
    }
  }
};
</script>

<style scoped>
.ui.button {
  width: 40vw;
  height: 20vh;
  margin: 10px 10px;
  border-radius: 4px;
  background-color: #7b8235;
}

img.ui.image {
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  margin: 0 auto;
}

span {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  color: white;
}
</style>
