<template>
  <sui-button class="event" style="color:#61220C;" inverted fluid>
    <div class="items">
      <div class="title">
        <h1>{{ this.eventName }}</h1>
      </div>
      <div class="datentime">
        <p>{{this.eventDate }}</p>
        <p>{{this.eventTime}}</p>
      </div>
      <div class="row">
        <sui-icon name="map marker alternate" />
        <p>{{ this.eventLocation}}</p>
      </div>
      <div v-for="event in this.events" :key="event.id">
        <div class="row">
          <sui-icon name="star outline" />
          <span>{{ event }}</span>
        </div>
      </div>
    </div>
  </sui-button>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "selectedDayPanel",
  props: ["eventName", "eventLocation", "eventDate", "eventTime", "events"],
  mounted() {}
};
</script>

<style scoped>
.ui.card {
  margin: 0 auto;
}

.ui.fluid.button {
  width: 90%;
  margin: 0 auto;
  background-color: rgb(224, 225, 226, 0.5);
  border: 1px white;
}

h3 {
  color: "mediumvioletred";
  font-size: 14px;
  font-weight: 400;
}

.items {
  display: flex;
  flex-direction: column;
}

.datentime {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px;
  font-size: 120%;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

span {
  font-size: 120%;
}
</style>
