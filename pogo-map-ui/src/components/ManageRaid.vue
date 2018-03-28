<template>
  <modal name="raid" height="auto" :adaptive="true" @before-close="beforeClose">
    <div class="p-3">
      <div class="sp-close" @click="$modal.hide('raid')">×</div>
        <h2>{{ raid ? 'Modifier' : 'Ajouter'}} un raid 5 &#9733;</h2>
        <v-form v-model="valid" @submit.prevent="saveRaid()">
          <v-select
            :items="gyms"
            item-text="name"
            v-model="selectedGymName"
            label="Nom de l'arène"
            autocomplete
            required
          ></v-select>
          <v-text-field
            label="Heure du pop"
            v-model="timeOfPop"
            :rules="timeOfPopRules"
            placeholder="Au format HH:MM ex : 14:45"
            :validate-on-blur="true"
            mask="##:##"
            :return-masked-value="true"
            required
          ></v-text-field>
          <v-text-field
            label="On lance à"
            v-model="startTime"
            :rules="startTimeRules"
            placeholder="Au format HH:MM ex : 14:45"
            :validate-on-blur="true"
            mask="##:##"
            :return-masked-value="true"
          ></v-text-field>
          <button type="submit" class="btn btn-primary">Enregistrer</button>
        </v-form>
        <div class="alert alert-danger mt-3 mb-2" v-if="error">{{error}}</div>
      </div>
    </modal>
</template>

<script>

import {timeToDate, toPrintedDate} from '../services/date-service'
import {getGyms, findGymIdByName, postRaid, putRaid} from '../services/gyms-services'

export default {
  props: ['raid'],
  data() {
    return {
      selectedGymName: '',
      timeOfPop: '',
      startTime: '',
      gyms: [],
      error: '',
      valid: false,
      timeOfPopRules: [
        v => !!v || 'L\'heure du pop est obligatoire',
        v => /^[0-9]{2}:[0-9]{2}$/.test(v) || 'L\'heure du pop n\'est pas au bon format'
      ],
      startTimeRules: [
        v => !v || /^[0-9]{2}:[0-9]{2}$/.test(v) || 'L\'heure de lancement n\'est pas au bon format'
      ]
    }
  },
  watch: {
    raid() {
      if(this.raid) {
        this.selectedGymName = this.raid.gym.name;
        this.timeOfPop = toPrintedDate(this.raid.hatchTime);
        if(this.raid.raidStartTime) {
          this.startTime = toPrintedDate(this.raid.raidStartTime);
        }
      } else {
        this.resetFields();
      }
    }
  },
  methods: {
    saveRaid() {
      this.$validator.validateAll().then(async res => {
        if (res) {
          var id = await findGymIdByName(this.selectedGymName);
          var timeOfPopDate = timeToDate(this.timeOfPop);
          if (this.startTime) {
            var startTimeDate = timeToDate(this.startTime);
          }
          let res;
          if(this.raid) {
            res = await putRaid({id: this.raid.id, gymId: id, hatchTime: timeOfPopDate.toISOString(),
              raidStartTime: startTimeDate ? startTimeDate.toISOString() : ''})
              .catch(e => e);
          } else {
            res = await postRaid({gymId: id, hatchTime: timeOfPopDate.toISOString(), raidStartTime: startTimeDate ?
              startTimeDate.toISOString() : ''})
              .catch(e => e);
          }
          this.error = res.message;
          if(!this.error) {
            this.resetFields();
            this.$toasted.show('Raid enregistré avec succès', {duration : 2000, className: 'toast-success', fullWidth: true, position: 'top-center', fitToScreen: false});
            this.$emit('raidModified');
            this.$modal.hide('raid');
          }
        }
      });
    },
    beforeClose() {
      this.$emit('closeModal');
    },
    resetFields() {
      this.selectedGymName = '';
      this.timeOfPop = '';
      this.startTime = '';
    }
  },
  async created() {
    this.gyms = await getGyms();
  }
}
</script>

<style>

.v--modal-overlay {
  z-index: 9999!important;
}

.toasted-container.top-center {
  top: 0px;
}

.toasted.toast-success {
  color: #2ecc71!important;
  justify-content: center;
}

h2 {
  text-align: center;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
