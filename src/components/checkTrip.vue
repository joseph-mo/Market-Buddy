<template>
<div>

<modal class="modal trip" name="checktrip" animation="scale" width="350px" height="220px">
    <h2 style="padding:20px">Did you complete your last trip to the Farmer's Market?</h2>
    <div class="buttons">
        <sui-button style="width: 100px;" color="red" @click="didntGo()" content="No" icon="frown">
        </sui-button>
        <sui-button style="width: 100px;" color="green" @click="didGo()" content="Yes" icon="smile">
        </sui-button>
    </div>
</modal>


<modal class="modal" name="levelup" width="350px" height="270px">
    <div class="msgcontent">
        <h3>{{msg}}</h3>
        <h3>You have advanced to</h3>
        <div class="levelbox" 
        v-bind:style="{ 'background-color': activeColor}">
            <sui-icon class="levelname" name="trophy"/>
            <span class="levelname">Level {{Number(currentlevel)+1}}</span>
        </div>
    <div class="ok">
        <sui-button class="ok_button" @click="closeLevelUp()">Ok!</sui-button>
    </div>
    </div>
</modal>

<modal class="modal" name="didntgomessage" width="350px" height="220px">
    <div class="msgcontent">
    <h3 style="padding:20px">That's okay, sometimes life changes! Why not reschedule your trip?</h3>
    <div class="no_ok">
        <sui-button class="ok_button" @click="goHome()">Ok!</sui-button>
    </div>
    </div>
</modal>
</div>


</template>
<script>
import levels from "@/json/levels.json";
//take in a prop for level, and v-if show the level up message for that level ?
export default {
    data: function() {
        return {
            currlevel: localStorage.getItem('level'),
            newlevel: '',
            levelslist: JSON.stringify(levels),
            activeColor:'#61220c',
        }
    },
    props: {
        currentlevel: String,
        msg: String
    },

    mounted() {
        //to get background color for updatelevel
        var parsed = JSON.parse(this.levelslist)
        var idx = this.currentlevel 
        this.activeColor = parsed[idx].color
    },

    methods: {
        didntGo() {
            this.$modal.show('didntgomessage');
        },
        didGo() {
            this.$modal.show('levelup');
            
        },
        closeLevelUp() {
            //hide the modal
            this.$modal.hide('levelup');
            this.updateLevel()
            this.goHome()
        },
        updateLevel() {
            console.log('attempting to update level')
            //convert currentlevel to Number
            this.newlevel = Number(this.currlevel) + 1;
            console.log("this.newlevel" + this.newlevel)
            console.log(typeof(this.newlevel))
            this.newlevel.toString()
            localStorage.setItem("level", this.newlevel)
            console.log('attempted to update level')
            console.log(localStorage.getItem('level'))
        },
        goHome() {
            localStorage.removeItem("eventName");
            localStorage.removeItem("events");
            localStorage.removeItem("clickedMotivations")
            localStorage.removeItem("info");
            this.$router.push({
                path: "/"
            })
        },
    }
}

</script>

<style scoped>
.ok_button {
    background-color: #df6d26;
    color: white;
}

.buttons{
    padding: 0px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.msgcontent{
    padding:10px;
    text-align: center;
}

.ok {
    padding: 20px;
}

.no_ok {
    padding: 0px;
}

.content {
    padding: 0px;
    margin: 0px;
}

.levelbox {
    display: flex;
    justify-content: center;
    margin: auto;
    width: 200px;
    padding: 10px;
    border-radius: 4px;
}

</style>