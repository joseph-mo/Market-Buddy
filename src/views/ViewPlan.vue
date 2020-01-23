<template>
  <div id="planDetailPage">
    <img class="background" v-bind:src="imageSource()" alt="App Background" />

    <checkTrip :currentlevel="this.level" :msg="this.msg"></checkTrip>

    <div v-if="checkPosition()">
      <sui-message>
        <sui-button @click="showmodal('levelup')">Check In at the Market!</sui-button>
      </sui-message>
    </div>

    <h1>Your Trip Is Confirmed!</h1>
    <div class="selectedDay">
      <selectedDayPanel
        :eventName="this.eventName"
        :eventLocation="this.eventLocation"
        :eventDate="this.eventDate"
        :eventTime="this.eventTime"
        :events="this.events"
      />
    </div>

    <div class="openmaps">
      <sui-button id="mapsbutton">
        <a style="color: white" v-bind:href="this.mapsLocation" target="_blank">
          <sui-icon name="map marker alternate" />Open Maps Directions
        </a>
      </sui-button>
    </div>

    <h3 v-if="this.motivationsDict">Let's try and do all these things during your upcoming trip!</h3>
    <h3 v-if="!this.motivationsDict">Click Edit to add activities you'd like to do on this trip!</h3>
    <div class="selectedMotivations">
      <div v-for="(value, name) in this.motivationsDict" v-bind:key="value.id">
        <selectedMotivations :motivationName="name" :motivationImage="value" />
      </div>
    </div>

    <div class="links">
      <!-- Routes back to PlanDetails.vue and passes motivationsData
        as a parameter back to PlanDetails.vue. This allows us to store
        the motivations already selected by the user so it doesn't reset
        once we route back to PlanDetails.vue. Can retrieve this parameter
      in PlanDetails.vue using this.$route.params-->
      <router-link
        :to="{
          name: 'plan',
          params: { motivationsData: this.motivationsDict }
        }"
      >
        <sui-button class="btn_links" id="edit" size="large">Edit</sui-button>
      </router-link>

      <router-link to="/">
        <sui-button class="btn_links" id="cancel" size="large" v-on:click="eraseData()">Reschedule</sui-button>
      </router-link>
    </div>
    <footer>
      <levelsFooter :currentlevel="this.level"></levelsFooter>
    </footer>
  </div>
</template>

<script src="https://code.jquery.com/jquery-3.4.1.js"></script>

<script>
import selectedDayPanel from "@/components/selectedDayPanel.vue";
import selectedMotivations from "@/components/selectedMotivations.vue";
import levelsFooter from "@/components/levelsFooter.vue";
import checkTrip from "@/components/checkTrip.vue";
import moment from "moment";
import levels from "@/json/levels.json";

export default {
  name: "viewPlan",
  components: {
    selectedDayPanel,
    selectedMotivations,
    levelsFooter,
    checkTrip
  },
  data: function() {
    return {
      motivationsDict: null,
      eventName: "",
      events: null,
      eventLocation: "",
      eventDate: "",
      eventTime: "",
      mapsLocation: "",
      eventData: null,
      //if want to test, change to specific date
      currentdate: moment().format("ll"),
      // currentdate: "Oct 10, 2019",
      level: localStorage.getItem("level"),

      //for displaying level specific stuff
      levelslist: JSON.stringify(levels),
      msg: "",
      error: "",
      lat: "",
      lon: "",
      marketlat: "42.450",
      marketlon: "-76.509",
      homelat: "42.458",
      homelon: "-76.486",
      currentlat: "42.443",
      currentlon: "-76.484"
    };
  },

  created() {
    //geolocation stuff
    this.initGeolocation();
  },

  mounted() {
    $(document).ready(function() {
      $(this).scrollTop(0);
    });
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

    if (localStorage.getItem("clickedMotivations")) {
      this.motivationsDict = localStorage.getItem("clickedMotivations");
      this.motivationsDict = JSON.parse(this.motivationsDict);
    }

    //if not at farmers market now, and it is after date, show the checktrip thing
    if (this.checkAfterDate() && !this.checkPosition()) {
      this.showmodal("checktrip");
    }

    var parsed = JSON.parse(this.levelslist);
    var idx = this.level;
    this.msg = parsed[idx].message;
  },
  methods: {
    eraseData: function() {
      localStorage.removeItem("eventName");
      localStorage.removeItem("events");
      localStorage.removeItem("eventLocation");
      localStorage.removeItem("eventDate");
      localStorage.removeItem("eventTime");
      localStorage.removeItem("clickedMotivations");
      localStorage.removeItem("info");
    },
    initGeolocation: function() {
      //checks if we can even geolocate
      if (navigator.geolocation) {
        //if so get the current position
        this.error = "none";
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        //otherwise show an error message
        this.error = "Geolocation is not supported.";
      }
    },
    showPosition: function(position) {
      //get latitude coordinate
      this.lat = position.coords.latitude;
      //get longitude coordinate
      this.lon = position.coords.longitude;
    },
    checkPosition: function() {
      //get lat and long to first 3 decimal places
      var mylat = this.lat.toString().substring(0, 6);
      //0 to 7 to include negative sign
      var mylon = this.lon.toString().substring(0, 7);
      //HERE change lat/lon to test geolocation
      //right now it will actually work to check if at the market
      if (mylat == this.marketlat && mylon == this.marketlon) {
        return true;
      } else {
        return false;
      }
    },
    showmodal(modalname) {
      this.$modal.show(modalname);
    },
    checkAfterDate() {
      if (
        moment(this.currentdate).isAfter(moment(localStorage.getItem("date")))
      ) {
        return true;
      } else {
        return false;
      }
    },
    imageSource: function() {
      var images = require.context("../assets/", false, /\.jpg$/);
      return images("./wood.jpg");
    }
  }
};
</script>

<style scoped>
#edit {
  background-color: #df6d26;
  color: white;
}

#cancel {
  background-color: #df6d26;
  color: white;
}

#mapsbutton {
  background-color: #61220c;
}

#planDetailPage {
  background-color: #f9dfdb;
  z-index: 3;
  position: relative;
}
.selectedDay {
  margin-bottom: 10px;
}

.selectedMotivations {
  margin-bottom: 30px;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.links {
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}

.btn_links {
  margin-bottom: 50px;
}

h1 {
  margin-top: 20px;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.ui.fluid.button {
  cursor: default;
}
</style>
