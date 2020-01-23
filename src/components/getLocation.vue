<template>
<div id="app">
</div>
</template>

<script>
export default {
  data() {
    return {
        error: '',
        lat:'',
        lon:'',
        marketlat: '42.450',
        marketlon: '-76.509',
        homelat: '42.458',
        homelon: '-76.486',
        currentlat: '42.443',
        currentlon: '-76.484',
        visitcount: 0
    }
  },  

  name: 'getLocation',
  
  methods:{
    initGeolocation: function () {	
        //checks if we can even geolocate	
        if(navigator.geolocation){
            //if so get the current position
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }else{
            //otherwise show an error message
            this.error = "Geolocation is not supported."; 
        }
    },
    showPosition:function (position) {	
        //get latitude coordinate
        this.lat = position.coords.latitude;
        //get longitude coordinate
        this.lon = position.coords.longitude;
        console.log('position attempted to show')
        console.log(typeof(this.lat))
    },
    checkPosition:function () {
        //get lat and long to first 3 decimal places
        var mylat = this.lat.toString().substring(0,6)
        //0 to 7 to include negative sign
        var mylon = this.lon.toString().substring(0,7);
        console.log("mylat: " + mylat)
        console.log("mylon: " + mylon)
        if (mylat==this.currentlat && mylon==this.currentlon) {
            this.visitcount += 1;
        }
    },

    save_level: function(level){
      localStorage.setItem('level',JSON.stringify(level));
    }
  }
}
</script>   