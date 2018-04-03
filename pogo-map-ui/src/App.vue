<template>
  <div id="app">
    <v-app>
      <v-map :zoom=15 :center="[48.828036, 2.32696]">
        <v-tilelayer
          v-for="tileLayer in tileLayers"
          :url="tileLayer.url"
          :options="tileLayer.options"
          :key="tileLayer.url"
        />

        <v-marker
          v-for="marker in markers"
          :lat-lng="marker.latLng"
          :icon="marker.icon"
          :options="marker.options"
          :key="marker.id">
          <v-popup v-if="marker.raid">
            <div style="width: 150px; text-align: center">
              <div class="gymName">{{ marker.raid.gym.name }}</div>
              5 &#9733;<br/>
              Pop : {{ toPrintedDate(marker.raid.hatchTime) }}<br/>
              Fin : {{ getEndDate(marker.raid.hatchTime) }}<br/>
              On lance à : {{ marker.raid.raidStartTime ? toPrintedDate(marker.raid.raidStartTime) : '-' }}<br/>
              <a href='#' @click="showAddRaid(marker.raid)">Modifier</a>
              <div style="margin-top: 10px"><strong>{{getNumberOfPlayers(marker.raid)}} participants</strong></div>
              <div><a href="#" @click="showAddPlayer(marker.raid)">Ajouter un participant</a></div>
            </div>
          </v-popup>

          <v-tooltip v-if="marker.raid" :options="buildTooltipOptions()">
            <raid-count-down :raid="marker.raid"/>
          </v-tooltip>
        </v-marker>
      </v-map>

      <manage-raid :raid="selectedRaid" @raidModified="raidModified($event)" @closeModal="closeModal()"/>
      <add-player :raid="selectedRaid" @playerAdded="raidModified($event)" @closeModal="closeModal()"/>

      <div v-if="showAddImage" class="action-add" @click="showAddRaid()">
        <img src="static/assets/add.png" style="height:50px;"/>
      </div>

      <!--<div class="refresh-action" :class="{'infinite-rotate': loading}" @click="loadData()">-->
      <!--<i class="fas fa-sync-alt"></i>-->
      <!--</div>-->

      <v-snackbar
        :timeout="2000"
        :top="true"
        v-model="toast.visible">
        {{ toast.text }}
        <v-btn flat @click.native="toast.visible = false">Close</v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
  import {getActiveRaids, findGymById} from './services/gyms-services'
  import {toPrintedDate} from './services/date-service'
  import ManageRaid from './components/ManageRaid'
  import AddPlayer from './components/AddPlayer'
  import RaidCountDown from './components/RaidCountDown'

  export default {
    data() {
      return {
        gyms: [],
        tileLayers: [],
        markers: [],
        selectedRaid: {},
        showAddImage: true,
        loading: false,
        toast: {
          visible: false,
          text: ''
        }
      }
    },
    components: {ManageRaid, AddPlayer, RaidCountDown},

    async created() {
      this.tileLayers.push({
        url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}',
        options: {
          attribution: `Map tiles by
            <a href="http://stamen.com">Stamen Design</a>,
            <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy;
            <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`,
          subdomains: 'abcd',
          minZoom: 0,
          maxZoom: 20,
          ext: 'png'
        }
      });

      this.loadData();
      setInterval(() => this.loadData(), 20000);
    },

    methods: {
      toPrintedDate,

      showAddRaid(raid) {
        this.selectedRaid = raid;
        this.showAddImage = false;
        this.$modal.show('raid');
      },

      showAddPlayer(raid) {
        this.selectedRaid = raid;
        this.$modal.show('player');
      },

      getNumberOfPlayers(raid) {
        if(raid.players) {
          return raid.players.map(player => player.accounts).reduce((a,b) => a+b, 0);
        }
        return 0;
      },

      buildTooltipOptions() {
        return {
          permanent: true,
          opacity: 1,
          offset: new L.Point(0, -50),
          direction: 'top'
        }
      },

      getEndDate(startDate) {
        return toPrintedDate(new Date(new Date(startDate).getTime() + 45 * 60 * 1000));
      },

      raidModified(event) {
        this.showToast(event.message);
        this.loadData();
      },

      closeModal() {
        this.showAddImage = true;
      },

      async addCoordinates(raids) {
        for (let raid of raids) {
          raid.gym = await findGymById(raid.gymId);
        }
        return raids;
      },

      buildIcon(gym) {
        return new L.DivIcon({
          // iconUrl: 'static/assets/gym.png',
          iconSize: [50, 50], // size of the icon
          iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -50], // point from which the popup should open relative to the iconAnchor
          html: `<div class="gym-marker ${gym.ex_eligible ? 'gym-ex' : ''}"></div>`
        });
      },

      async loadData() {
        this.loading = true;

        const activeRaids = await this.addCoordinates(await getActiveRaids());

        this.markers = [];

        for (let raid of activeRaids) {
          this.markers.push({
            id: raid.id,
            raid,
            latLng: {
              lat: raid.gym.latitude,
              lng: raid.gym.longitude
            },
            icon: this.buildIcon(raid.gym)
          });
        }

        this.loading = false;
      },

      showToast(text) {
        this.toast.text = text;
        this.toast.visible = true;
      }
    }
  }
</script>

<style lang="scss">
  /*@import '../node_modules/bootstrap/scss/bootstrap.scss';*/

  $light-white: #FCFEFA;

  #app {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .leaflet-tooltip {
    background-color: transparent;
    padding: 0 !important;
    border: none !important;
    border-radius: 12px;
  }

  .leaflet-div-icon {
    background: none;
    border: 0 none;
  }

  .gym-marker {
    background: url('/static/assets/gym.png');
    width: 50pt;
    height: 50pt;
    background-size: 50pt;
    background-position: -9px 0px;

    &.gym-ex:before {
      content: 'EX';
      position: relative;
      background: #4e4e4e;
      top: 0;
      left: 31px;
      text-align: center;
      color: white;
      border-radius: 15px;
      border: 2px solid $light-white;
      padding: 4px;
      font-size: 8px;
    }
  }

  .gymName {
    font-weight: bold;
    font-size: 15px;
  }

  .action-add {
    height: 50px;
    width: 50px;
    z-index: 10000;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }

  .refresh-action {
    z-index: 9999;
    position: absolute;
    right: 12px;
    top: 67px;

    i {
      border: 2px solid #4178ce;
      background: #54a0e6;
      border-radius: 30px;
      padding: 7px;
      font-size: 27px;
      cursor: pointer;
      color: white;
    }
  }

  .infinite-rotate {
    animation: btn-loading 1s infinite linear;
  }

  @keyframes btn-loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }

  .smart-popin {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto; /* scrollbar will appear if the viewport is too tight to display all the popin content */
    opacity: 0;
    visibility: hidden;

    /* design */

    background-color: rgba(0, 0, 0, 0.5);
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
    min-width: 300px; /* standard width for xs smartphones (320px) minus 2*10px (.sp-cell margins) */
    margin: 0 auto;

    /* design */

    background-color: #ffffff;
    padding: 2em;
    -webkit-box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.25);
    box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.25);
    width: 66.66%; /* 66.66 looks good :-) */
  ;
  }

  .smart-popin .sp-body * {
    max-width: 100%; /* this is a security to prevents wide elements such as img to stretch the popin beyond the viewport width */
  }

  .smart-popin .sp-back { /* only used to get clicks out of the popin body */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: block;
  }

  .sp-close {
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
    cursor: pointer;
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

  /* Vuetify */

  .snack {
    z-index: 10001;
  }

  html {
    background: #f2f2f2;
  }

  img {
    max-width: 100%;
    width: 100% \9
  ; /* this is a hack for IE9 since min-width won't work */
  }

  h2 {
    margin-top: 0;
  }

  p {
    margin-top: 0;
  }

</style>
