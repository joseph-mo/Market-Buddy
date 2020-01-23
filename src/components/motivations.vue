<template>
  <sui-button v-bind:class="this.motivationData.imgURL" v-on:click="selected()">
    <sui-image v-bind:src="imageSource()" alt="Label motivation image" />
    <span>{{ motivationData.motivation_name }}</span>
  </sui-button>
</template>

<script type="text/javascript" src="./json/motivations.json"></script>

<script src="https://code.jquery.com/jquery-3.4.1.js"></script>

<script>
export default {
  name: "motivations",
  props: ["motivationData"],
  methods: {
    // Inspiration taken from online research
    imageSource: function() {
      if (this.motivationData.imgURL != null) {
        var images = require.context("../assets/", false, /\.jpg$/);
        return images("./" + this.motivationData.imgURL + ".jpg");
      }
    },
    selected: function() {
      let className = "." + this.motivationData.imgURL;
      let rgb = $("button.ui.button." + this.motivationData.imgURL).css(
        "background-color"
      );
      if (
        $("button.ui.button." + this.motivationData.imgURL).css(
          "background-color"
        ) !== "rgb(87, 92, 38)"
      ) {
        $("button.ui.button." + this.motivationData.imgURL).css(
          "background-color",
          "#575C26"
        );
      } else {
        $("button.ui.button." + this.motivationData.imgURL).css(
          "background-color",
          ""
        );
      }
    }
  }
};
</script>

<style scoped>
.ui.button {
  width: 40vw;
  height: 20vh;
  margin: 10px auto;
  border-radius: 4px;
  transition: 0.1s ease-in-out;
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

.motivationsColor {
  background-color: lightblue;
}
</style>
