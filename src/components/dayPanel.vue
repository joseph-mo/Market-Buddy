<template class="ui">
  <sui-button class="event" style="color:#61220C;" inverted v-on:click="select(data)" fluid>
    <div class="items">
      <div class="title">
        <h1>{{ this.data.name }}</h1>
      </div>
      <div class="datentime">
        <p>{{this.data.date}}</p>
        <p>{{this.data.time}}</p>
      </div>
      <div class="row">
        <sui-icon name="map marker alternate" />
        <p>{{ this.data.location }}</p>
      </div>
      <div v-for="event in this.data.events" :key="event.id">
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
    return {
    
    };
  },
  name: "dayPanel",
  props: ["data"],
  mounted() {
  },
  methods: {
    select(d) {
      this.$emit("save_data", this.data);
      this.$emit("save_the_date", this.data.date);
      let eventName = d.name;
      localStorage.setItem("eventName", eventName);
      let eventLocation = d.location;
      localStorage.setItem("eventLocation", eventLocation);
      let eventDate = d.date;
      localStorage.setItem("eventDate", eventDate);
      let mapsLocation = d.mapsLocation;
      localStorage.setItem("mapsLocation", mapsLocation);
      let eventTime = d.time;
      localStorage.setItem("eventTime", eventTime);
      let events = d.events;
      localStorage.setItem("events", events);
    }
  }
};
</script>

<style scoped>

.event {
  width: 40%;

}

.ui.inverted.button {
  background-color: #e0e1e2;
  background-color: rgb(224, 225, 226, 0.5);
  margin-left:0;
}

.ui.inverted.button:hover {
  background-color: rgb(224, 225, 226, 1);
}

.ui.inverted.button:active {
  background-color: rgb(224, 225, 226, 1);
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
