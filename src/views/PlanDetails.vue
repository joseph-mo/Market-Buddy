<template>
  <div id="planPage">
    <img class="background" v-bind:src="imageSource()" alt="App Background" />
    <sui-button size="mini" attached="bottom" style="background-color: #7b8235;">
    <router-link to="/" class="backbutton">
      <div class="row">
      <sui-icon name="long arrow alternate left" size="big" style="color: white;" v-on:click="eraseData()"/>
      <h4>Back</h4>
      </div>
    </router-link>
    </sui-button>

    <h1>Your trip is almost set for:</h1>

    <selectedDayPanel
      :eventName="this.eventName"
      :eventLocation="this.eventLocation"
      :eventDate="this.eventDate"
      :eventTime="this.eventTime"
      :events="this.events"
    />

    <h2>What are you looking forward to on this trip?</h2>
    <!-- Loops through data in motivations.json. Calls on save_motivations_info for each motivation clicked to be stored so that we can retrieve this information. -->
    <div
      class="motivationSection"
      v-for="motivation in this.motivationsList"
      v-bind:key="motivation.id"
      v-on:click="save_motivations_info(motivation)"
    >
      <!-- Passes each object in motivations.json to motivations.vue -->
      <motivations
        v-bind:class="motivation.imgURL"
        :motivationData="motivation"
      />
    </div>

    <router-link class="routeToPlan" to="/view">
      <sui-button type="submit" class="setBtn" size="large" 
        >Set Reminder</sui-button
      >
    </router-link>
  </div>
</template>

<script type="text/javascript" src="./json/events.json"></script>

<script>
import selectedDayPanel from "@/components/selectedDayPanel.vue";
import motivations from "@/components/motivations.vue";
import motivationsData from "@/json/motivations.json";
import transportations from "@/json/transportations.json";

export default {
  data: function() {
    return {
      motivationsList: motivationsData,
      motivationsDict: {},
      eventName: "",
      events: null,
      eventLocation: "",
      eventDate: "",
      eventTime: "",
      mapsLocation: "",
      transportationsList: transportations,
      eventData: null
    };
  },
  name: "plan",
  components: {
    selectedDayPanel,
    motivations
  },
  mounted: function() {
    $(document).ready(function() {
      $(this).scrollTop(0);
    });

    if (localStorage.getItem("clickedMotivations")) {
      this.motivationsDict = JSON.parse(
        localStorage.getItem("clickedMotivations")
      );
      let dict = JSON.parse(localStorage.getItem("clickedMotivations"));
      for (var key in dict) {
        let className = dict[key];
      }
    }
    /* Retrieves items from localStorage for day selected. This data
    is passed into the data props from selectedDayPanel.vue
    Same format as displayed on PlanDetails.vue */
    if (localStorage.getItem("eventName")) {
      this.eventName = localStorage.getItem("eventName");
    }
    if (localStorage.getItem("eventLocation")) {
      this.eventLocation = localStorage.getItem("eventLocation");
    }
    if (localStorage.getItem("mapsLocation")) {
      this.mapsLocation = localStorage.getItem("mapsLocation");
    }
    if (localStorage.getItem("eventDate")) {
      this.eventDate = localStorage.getItem("eventDate");
    }
    if (localStorage.getItem("eventTime")) {
      this.eventTime = localStorage.getItem("eventTime");
    }
    if (localStorage.getItem("events")) {
      this.events = localStorage.getItem("events").split(",");
    }

    /* This retrieves the motivations displayed in ViewPlan.vue so that motivationsDict is not set back to an empty dict when routed back to this view. In the case of a newly created plan, we must first
    check if motivationsData has already been declared in ViewPlan.vue
    to prevent setting this.motivationsDict to null */
    if (this.$route.params["motivationsData"] != null) {
      this.motivationsDict = this.$route.params["motivationsData"];
    }
  },
  methods: {
    /* Function is called when a motivation button is clicked
    motivationInfo: Object in motivations.json containing the
    field 'motivation_name' to access the respective motivation
    Checks to see if motivation already included in this.motivationsArr - if not, then add motivation to the
    array. This prevents the user from passing in the same motivation into the array, which ensures only one of each motivation selected is displayed in ViewPlan.vue
    Also sets this.motivationsArr in localStorage to be called in ViewPlan for retrieving the selected motivations.
    */
    save_motivations_info: function(motivationInfo) {
      let motivationName = motivationInfo.motivation_name;
      let motivationImgURL = motivationInfo.imgURL;
      if (!(motivationName in this.motivationsDict)) {
        this.motivationsDict[motivationName] = motivationImgURL;
      } else {
        delete this.motivationsDict[motivationName];
      }
      localStorage.setItem(
        "clickedMotivations",
        JSON.stringify(this.motivationsDict)
      );
    },
    eraseData: function() {
      localStorage.removeItem("eventName");
      localStorage.removeItem("events");
      localStorage.removeItem("clickedMotivations");
      localStorage.removeItem("info");
    },
    // Inspiration taken from online research
    imageSource: function() {
      var images = require.context("../assets/", false, /\.jpg$/);
      return images("./wood.jpg");
    }
  }
};
</script>

<style scoped>
#planPage {
  z-index: 3;
  position: relative;
}
#planPage {
  background-color: #f9dfdb;
}

.routeToPlan {
  margin-bottom: 50px;
}

.row {
  display: flex;
  flex-direction: row;
}

.setBtn {
  display: block;
  background-color: #df6d26;
  color: white;
  margin: 50px auto 50px auto;
  margin-top: 10px;
  margin-bottom: 60px;
}

.backbutton {
  display: block;
  text-align: left;
  margin: auto;
}

h2 {
  margin-bottom: 30px;
}

h4 {
  margin: auto;
  color: white;
}

.motivationSection {
  width: 50%;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.ui.fluid.button {
  cursor: default;
}
</style>
