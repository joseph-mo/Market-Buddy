<template>
<div class="ui true fixed wrap sticky" v-bind:style="{ 'background-color': activeColor}">
    <sui-label v-if="this.open==true" pointing="below">
        <div class="row">
        <span @click="togglebox()" style="padding-right:10px;">X</span>
        <p>Every time you check in at the market, you'll earn a new level with a new color displayed here! Open the app while at the Market to check in and level up. If you forget, you can tell me you went next time you open the app and level up!</p>
        </div>
    </sui-label>
    <div class="container">
        <div class="row">
            <div id="levelinfo">
            <sui-icon class="levelname" name="trophy"/>
            <span class="levelname">Level {{currentlevel}}</span>
            </div>
            <sui-icon id="openbox" @click="togglebox()" name="help" circular/>
        </div>
        <div class="row">
            <span>Achieve the next level by checking in at the Farmers Market!</span>
        </div>
    </div>
</div>
</template>

<script>
import levels from "@/json/levels.json";

export default {
    name: 'levelsFooter',
    props: {
        currentlevel: String
    },
    data: function() {
        return {
            levelslist: JSON.stringify(levels),
            activeColor:'#61220c',
            open: false
        }
    },

    mounted: function() {
        var parsed = JSON.parse(this.levelslist);
        var idx = this.currentlevel-1 //so if the current level is 1, get index 0 or json
        this.activeColor = parsed[idx].color;

    },

    methods: {
        getColor() {
            return this.color;
        },
        togglebox() {
            if (this.open==true){
                this.open=false;
            } else {
                this.open=true;
            }
        }
    }
}

</script>
<style>

.ui.sticky{
	position: absolute;
    bottom: 0;
    padding: 0px;
    width: 100%;
    color: white;
}

.container {
    display: flex;
    flex-direction: column;
    margin-top: 0px;
    padding: 5px;
    align-items: center;
}

.row {
    display: flex;
    padding: 5px;
}

.inline {
    display: flex;
    flex-direction: row;
    margin: auto;
}


.levelname {
    font-size: 150%;
    font-weight: bold;
    color: white;
}

#openbox {
    position: fixed;
    margin-left: 50%;
    margin-right: 20px;
}

</style>