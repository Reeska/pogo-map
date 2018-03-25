<template>
  <div id="app">
    <div id="mapid" class="map">
      <div class="smart-popin" id="popin1">
      	  <div class="sp-table">
      		    <div class="sp-cell">
      			      <div class="sp-body">
      				        <h2>Ajouter un raid 5 &#9733; :</h2>
                      <form v-on:submit.prevent="saveRaid">
                        <div class="form-group">
                          <label for="gymName">Nom de l'arène</label>
                          <input type="text" v-validate="'required'" list="gyms" class="form-control" v-model="selectedGymName" id="gymName" placeholder="Nom de l'arène">
                        </div>
                        <datalist id="gyms">
            						  <option v-for="gym in gyms" :id="gym.id" :value="gym.name"/>
            						</datalist>
                        <div class="form-group">
                          <label for="timeOfPop">Heure du pop</label>
                          <input type="text" v-validate="'required|regex:^[0-9]{2}:[0-9]{2}$'" name="timeOfPop" class="form-control" v-model="timeOfPop" id="timeOfPop" placeholder="HH:MM : ex 14:45">
                          <span v-show="errors.has('timeOfPop')" class="help is-danger">{{ errors.first('timeOfPop') }}</span>
                        </div>
                        <div class="form-group">
                          <label for="timeOfRaid">On lance à</label>
                          <input type="text" v-validate="'regex:^[0-9]{2}:[0-9]{2}$'" v-model="startTime" class="form-control" id="timeOfRaid" placeholder="HH:MM : ex 14:45">
                        </div>
                        <button type="submit" class="btn btn-primary">Enregistrer</button>
                      </form>
          				    <a href="#" class="sp-close">×</a>
          			  </div>
          			  <a href="#" class="sp-back"></a>
      		    </div>
      	  </div>
      </div>
      <div style="height:50px; width:50px;z-index:5454357;position:absolute;right:10px;top:10px;">
      	<a href="#popin1"><img src="assets/add.png" style="height:50px;"/></a>
      </div>
    </div>
  </div>
</template>

<script>
  import { getGyms, postRaid, getActiveRaids } from './services/gyms-services'
  export default {
    props: ['uid'],
    data() {
      return {
        gyms: '',
        selectedGymName: '',
        timeOfPop: '',
        startTime: ''
      }
    },
    methods : {
      saveRaid () {
        this.$validator.validateAll().then(res => {
          if(res) {
            var id = this.findGymIdByName(this.selectedGymName);
            var timeOfPopDate = this.toDate(this.timeOfPop);
            var startTimeDate = timeOfPopDate;
            if(this.startTime) {
              startTimeDate = this.toDate(this.startTime);
            }
            postRaid({ gymId: id, hatchTime: timeOfPopDate.toISOString(), raidStartTime: startTimeDate.toISOString() });
          }
        });
      },
      findGymIdByName (name) {
        return this.gyms.filter(gym => gym.name === name).map(gym => gym.id).reduce((a,b) => b, {});
      },
      toDate (date) {
        const [hour, minute] = date.split(':');
        var today = new Date();
        today.setHours(hour, minute);
        return today;
      },
      getEndDate (startDate) {
        return this.toPrintedDate(new Date(new Date(startDate).getTime() + 45*60*1000));
      },
      toPrintedDate (date) {
        var date = new Date(date);
        return date.getHours() + ':' + date.getMinutes();
      },
      findGymById (id) {
        return this.gyms.filter(gym => gym.id === id).reduce((a,b) => b, {});
      },
      addCoordinates (raids) {
        for(let raid of raids) {
          raid.gym = this.findGymById(raid.gymId);
        }
        return raids;
      }
    },
    async mounted() {
      var map = L.map('mapid').setView([48.828036, 2.32696], 15);

      var activeRaids = await getActiveRaids();
      activeRaids = this.addCoordinates(activeRaids);

    	var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    		subdomains: 'abcd',
    		minZoom: 0,
    		maxZoom: 20,
    		ext: 'png'
    	}).addTo(map);
      var greenIcon = L.icon({
    		iconUrl: 'assets/gym.png',
    		iconSize:     [50, 50], // size of the icon
    		iconAnchor:   [25, 50], // point of the icon which will correspond to marker's location
    		popupAnchor:  [0, -50] // point from which the popup should open relative to the iconAnchor
    	});

      for(let raid of activeRaids) {
        var gymPopup = "<div style='width: 150px; text-align: center'><div class='gymName'>" + raid.gym.name + "</div>5 &#9733;<br/>Pop : " + this.toPrintedDate(raid.hatchTime) + "<br/>Fin : " + this.getEndDate(raid.hatchTime) + "<br/>On lance à : " + this.toPrintedDate(raid.raidStartTime) + "<br/><a href='#popin1'>Modifier</a></div>";
        L.marker([raid.gym.latitude, raid.gym.longitude], {icon: greenIcon}).addTo(map).bindPopup(gymPopup);
      }

    	var gymPopup = "<div style='width: 150px; text-align: center'><div class='gymName'>Alésia</div>Ajouter un raid<br/>5 &#9733;<br/>Pop : 12:20<br/>Fin : 13:03<br/>On lance à : 12:45<br/>Modifier</div>";
    	L.marker([48.828036, 2.32696], {icon: greenIcon}).addTo(map).bindPopup(gymPopup);
    },
    created() {
      getGyms().then(gyms => {
        this.gyms = gyms;
      });
    }
  }
</script>

<style lang="scss">

  @import '../node_modules/bootstrap/scss/bootstrap.scss';

		.map {
			height: 100%;
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 0;
		}

    .gymName {
  font-weight: bold;
  font-size: 15px;
}

.smart-popin {
position: fixed;
left: 0; right: 0;
top: 0; bottom: 0;
overflow: auto; /* scrollbar will appear if the viewport is too tight to display all the popin content */
opacity: 0;
visibility: hidden;
z-index: 5454357;

/* design */

background-color: rgba(0,0,0,0.5);
-webkit-transition: all 0.4s ease;
-moz-transition: all 0.4s ease;
-ms-transition: all 0.4s ease;
-o-transition: all 0.4s ease;
transition: all 0.4s ease;
}
.smart-popin:target {
opacity: 1;
visibility: visible;
}
.smart-popin .sp-table {
display: table;
height: 100%;
width: 100%;
}
.smart-popin .sp-cell {
display: table-cell;
vertical-align: middle;
padding: 10px; /* this space is important to let the box-shadow exceed around the popin - so it has to be at least equal to the shadow radius */
}
.smart-popin .sp-body {
position: relative; /* to allow absolute positionning inside */
z-index: 5454358; /* to ensure the popin body will be over the .sp-back layer */
width: auto; /* by default the width of the wider element inside */
min-width: 300px;  /* standard width for xs smartphones (320px) minus 2*10px (.sp-cell margins) */
margin: 0 auto;

/* design */

background-color: #ffffff;
padding: 2em;
-webkit-box-shadow: 0 3px 5px 1px rgba(0,0,0,0.25);
box-shadow: 0 3px 5px 1px rgba(0,0,0,0.25);
width: 66.66%; /* 66.66 looks good :-) */;
}
.smart-popin .sp-body * {
max-width: 100%; /* this is a security to prevents wide elements such as img to stretch the popin beyond the viewport width */
}
.smart-popin .sp-back { /* only used to get clicks out of the popin body */
position: fixed;
left: 0; right: 0;
top: 0; bottom: 0;
display: block;
}
.smart-popin .sp-close {
position: absolute;
top: 0;
right: 0;

width: 36px;
height: 36px;

text-align: center;
line-height: 36px;
font-size: 1.6em;
color: #000000;
font-weight: 900;
text-decoration: none;
}

/* misc */

.website-content {
max-width: 980px;
padding: 20px;
margin: 0 auto;
}
.open-popin {
display: inline-block;
text-align: center;
color: #ffffff;
text-decoration: none;
background-color: crimson;
padding: 0.5em 1.5em;
border-radius: 20px;
margin-bottom: 0.8em;
}
html {
background: #f2f2f2;
}
img {
max-width: 100%;
width: 100%\9; /* this is a hack for IE9 since min-width won't work */
}
h2 { margin-top: 0; }
p { margin-top: 0; }

</style>
