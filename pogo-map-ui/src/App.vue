<template>
  <div id="app">
    <v-app>
      <v-map :zoom=15 :center="map.center">
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
            <div class="raid-popup">
              <h3>{{ marker.raid.gym.name }}</h3>
              5 &#9733;<br/>
              Pop : {{ toPrintedDate(marker.raid.hatchTime) }}<br/>
              Fin : {{ getEndDate(marker.raid.hatchTime) }}<br/>
              On lance à : {{ marker.raid.raidStartTime ? toPrintedDate(marker.raid.raidStartTime) : '-' }}<br/>

              <a href='#' @click="showAddRaid(marker.raid)">Modifier</a>

              <div class="players">
                <strong>{{getNumberOfPlayers(marker.raid)}} participant(s)</strong>
              </div>

              <div>
                <a href="#" @click="showAddPlayer(marker.raid)">Ajouter un participant</a>
              </div>
            </div>
          </v-popup>

          <v-tooltip v-if="marker.raid" :options="buildTooltipOptions()">
            <raid-count-down :raid="marker.raid"/>
          </v-tooltip>
        </v-marker>

        <v-marker
          v-if="location.position"
          :lat-lng="location.position.latLng"
          :icon="location.position.icon"
          :options="location.position.options" />
      </v-map>

      <manage-raid :raid="selectedRaid" @raidModified="raidModified($event)" @closeModal="closeModal()"/>
      <add-player :raid="selectedRaid" @playerAdded="raidModified($event)" @closeModal="closeModal()"/>

      <div class="actions-panel">
        <div class="action-btn action-add" @click="showAddRaid()">
          <i class="fas fa-plus"></i>
        </div>

        <div class="action-btn action-location" @click="toggleLocation()" :class="{'rotating': location.loading}">
          <i class="fas fa-location-arrow"></i>
        </div>

        <div class="action-btn action-reload" :class="{'rotating': loading}" @click="loadData()">
          <i class="fas fa-sync-alt"></i>
        </div>
      </div>

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
        map: {
          center: [48.828036, 2.32696]
        },
        gyms: [],
        tileLayers: [],
        markers: [],
        selectedRaid: {},
        showAddImage: true,
        loading: false,
        toast: {
          visible: false,
          text: ''
        },
        location: {
          position: null,
          loading: false
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
        this.showAddImage = false;
        this.$modal.show('player');
      },

      getNumberOfPlayers(raid) {
        if (raid.players) {
          return raid.players.map(player => player.accounts).reduce((a, b) => a + b, 0);
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
      },

      toggleLocation() {
        console.log('enable location');

        this.location.loading = true;

        navigator.geolocation.getCurrentPosition(position => {
          console.log('current position', position);

          this.location.position = {
            latLng: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            icon: new L.DivIcon({
              // iconUrl: 'static/assets/gym.png',
              // iconSize: [50, 50], // size of the icon
              // iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
              // popupAnchor: [0, -50], // point from which the popup should open relative to the iconAnchor
              html: `<span class="location-badge"><i class="fas fa-circle"></i></span>`
            })
          };

          this.map.center = [position.coords.latitude, position.coords.longitude];

          this.location.loading = false;

        }, error => {
          console.log('unable to get location', error);
          this.location.loading = false;
        });
      }
    }
  }
</script>

<style lang="scss">
  $light-white: #FCFEFA;

  /* Common */
  html {
    background: #f2f2f2;
  }

  img {
    max-width: 100%;
  }

  h2 {
    margin-top: 0;
  }

  p {
    margin-top: 0;
  }

  #app {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .rotating {
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

  /* leaflet */

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

  // Hack for Safari
  .application--wrap > .vue2leaflet-map {
    width: 100%;
    height: 100vh;
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

  .raid-popup {
    width: 150px;
    text-align: center;

    h3 {
      font-size: 15px;
    }

    .players {
      margin-top: 10px;
    }
  }

  /* UX */

  .actions-panel {
    z-index: 1000;
    position: absolute;
    right: 12px;
    top: 0;

    .action-btn {
      margin: 10px 0;

      i {
        border-radius: 23px;
        padding: 7px;
        cursor: pointer;
        color: white;
        font-weight: 700;
        width: 41px;
        height: 41px;
        text-align: center;

        font-size: 16pt;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &.action-add {
        i {
          font-size: 27px;
          background: rgba(3, 169, 244, 0.64);
        }
      }

      &.action-reload i {
        background: rgba(44, 38, 117, 0.64);
      }

      &.action-location i {
        background: rgba(42, 94, 165, 0.64);
      }
    }
  }

  .location-badge {
    color: #50a0f9;
    font-size: 9pt;
    background: rgba(49, 59, 243, 0.12);
    border-radius: 50px;
    padding: 7px;
    text-align: center;

    i {
      text-shadow: -2px 2px white, -2px -1px white, 2px 2px white, 2px -2px white;
    }
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

  /* Vuetify */

  .snack {
    z-index: 10001;
  }

</style>
