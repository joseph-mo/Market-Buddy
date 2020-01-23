<template>
  <div class="home">
    <!--Uncomment to reset Levels-->
    <!-- <sui-button @click="resetStorage()">Reset Storage</sui-button> -->
    <img class="background" v-bind:src="imageSource()" alt="App Background" />
    <h1 style="margin: 0px 0px 20px 0px; font-size:30px;" id="introHeader">
      Let's plan our {{ this.firstornext }} trip to the Ithaca Farmer's Market!
    </h1>
    <div class="content">
      <h2 id="arrow_header">Pick a day you want to go!</h2>
      <div class="spacing"></div>
      <sui-button
        v-on:click="backweek"
        icon="left chevron"
        label-position="left"
        :disabled="this.backweekstatus"
        id="left_arrow_button"
        content="prev week"
        floated="left"
      >
        <sui-icon name="angle left" />
      </sui-button>
      <sui-button
        v-on:click="forwardweek"
        icon="right chevron"
        label-position="right"
        :disabled="this.forwardweekstatus"
        id="right_arrow_button"
        content="next week"
        floated="right"
      />

      <div class="spacing"></div>

      <div
        v-for="event in this.eventList"
        v-bind:key="event.id"
        class="daypanels"
      >
        <div v-if="event.week == week">
          <dayPanel
            :data="event"
            @save_the_date="save_the_date"
            onclick="document.getElementById('ex').scrollIntoView({behavior: 'smooth'});"
          />
          <div class="spacing"></div>
        </div>
      </div>
      <div v-if="this.progress == true">
        <router-link to="/plan">
          <sui-button
            class="letsBtn"
            id="ex"
            color="pink"
            size="large"
            style="margin-bottom:40px"
            @save_data="save_info"
            >Let's Go!</sui-button
          >
        </router-link>
      </div>
    </div>
    <levelsFooter :currentlevel="this.level"></levelsFooter>
  </div>
</template>

<script type="text/javascript" src="./json/events.json"></script>
<script type="text/javascript" src="./json/levels.json"></script>
<script>
// @ is an alias to /src
import dayPanel from "@/components/dayPanel.vue";
import data from "@/json/events.json";
import levels from "@/json/levels.json";
import moment from "moment";
import levelsFooter from "@/components/levelsFooter.vue";

export default {
  data: function() {
    return {
      eventList: data,
      week: 1,
      backweekstatus: true,
      forwardweekstatus: false,
      currentdate: moment().format("ll"),
      progress: false,
      level: "0",
      firstornext: "first"
    };
  },

  name: "home",
  components: {
    dayPanel,
    levelsFooter
  },
  created: function() {
    if (
      localStorage.getItem("clickedMotivations") ||
      localStorage.getItem("info")
    ) {
      this.$router.push({
        path: "view"
      });
    }

    if (!localStorage.getItem("level")) {
      localStorage.setItem("level", this.level);
    } else {
      this.level = localStorage.getItem("level");
    }
  },
  mounted: function() {

    //don't want to clear localStorage because need to constantly save level
    localStorage.removeItem("info");
    if (localStorage.getItem("level")) {
      this.level = localStorage.getItem("level");
    }

    if (this.level != "0") {
      this.firstornext = "next";
    }
  },

  methods: {
    backweek: function() {
      this.progress = false;
      if (this.week > 1) {
        this.week -= 1;
        this.backweekstatus = false;
        this.forwardweekstatus = false;
      } else {
        this.backweekstatus = true;
      }

      if (this.week == 1) {
        this.backweekstatus = true;
      }
    },
    forwardweek: function() {
      this.progress = false;
      if (this.week < 8) {
        this.week += 1;
        this.forwardweekstatus = false;
        this.backweekstatus = false;
      } else {
        this.forwardweekstatus = true;
      }

      if (this.week == 8) {
        this.forwardweekstatus = true;
      }
    },
    save_info: function(info) {
      if (!localStorage.getItem("info")) {
        localStorage.setItem("info", JSON.stringify(info));
      }
    },
    save_the_date: function(date) {
      localStorage.setItem("date", date);
      this.progress = true;
    },
    eventData: function(event) {
      console.log(event);
    },
    resetStorage: function() {
      localStorage.clear();
    },
    // Inspiration taken from online research
    imageSource: function() {
      var images = require.context("../assets/", false, /\.jpg$/);
      return images("./wood.jpg");
    }
  }
};
</script>

<style>
.home {
  z-index: 3;
  position: relative;
  background-color: #f9dfdb;
  padding-top: 20px;
  margin: auto;
}

#ex {
  background-color: #df6d26;
}

.background {
  z-index: -2;
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.5;
}
.week-nav {
  justify-content: center;
  background-color: #f9dfdb;
}

#left_arrow_button {
  height: 60px;
  margin-bottom: 10px;
  background-color: #7b8235;
}

#right_arrow_button {
  height: 60px;
  margin-bottom: 10px;
  background-color: #7b8235;
}

sui-segments {
  background-color: #f9dfdb;
}

h2 {
  margin: 40px;
}

.spacing {
  margin-bottom: 10px;
}

.letsBtn {
  display: block;
  margin: 30px auto;
  margin-bottom: 100px;
}

.content {
  min-height: 100%;
  padding-bottom: 60px;
  margin-left: 30px;
  margin-right: 30px;
}

#introHeader {
  border-bottom: 2px solid #755732;
}

/* #arrow_header {
  display: inline;
} */

@media (max-width: 600px) {
  .letsBtn {
    height: 50px;
  }
  /* .spacing {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
  } */
  #introHeader {
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 10px;
  }


  #arrow_header {
    margin: 0px;
  }

  .daypanels {
    margin-top: 20px;
  }
}
</style>
