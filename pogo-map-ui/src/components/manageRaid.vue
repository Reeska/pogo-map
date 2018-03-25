<template>
  <modal name="raid" height="auto">
    <div class="p-3">
      <div class="sp-close" @click="$modal.hide('raid')">×</div>
        <h2>{{ raid ? 'Modifier' : 'Ajouter'}} un raid 5 &#9733;</h2>
        <form @submit.prevent="saveRaid()">
          <div class="form-group">
            <label for="gymName">Nom de l'arène</label>
            <input type="text" v-validate="'required'" list="gyms" class="form-control" v-model="selectedGymName"
                   id="gymName" placeholder="Nom de l'arène">
          </div>
          <datalist id="gyms">
            <option v-for="gym in gyms" :id="gym.id" :value="gym.name"></option>
          </datalist>
          <div class="form-group">
            <label for="timeOfPop">Heure du pop</label>
            <input type="text" v-validate="'required|regex:^[0-9]{2}:[0-9]{2}$'" name="timeOfPop"
                   class="form-control" v-model="timeOfPop" id="timeOfPop" placeholder="HH:MM : ex 14:45">
            <span v-show="errors.has('timeOfPop')" class="help is-danger">{{ errors.first('timeOfPop') }}</span>
          </div>
          <div class="form-group">
            <label for="timeOfRaid">On lance à</label>
            <input type="text" v-validate="'regex:^[0-9]{2}:[0-9]{2}$'" v-model="startTime" class="form-control"
                   id="timeOfRaid" placeholder="HH:MM : ex 14:45">
          </div>
          <button type="submit" class="btn btn-primary">Enregistrer</button>
        </form>
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
      gyms: []
    }
  },
  watch: {
    raid() {
      if(this.raid) {
        this.selectedGymName = this.raid.gym.name;
        this.timeOfPop = toPrintedDate(this.raid.hatchTime);
      } else {
        this.selectedGymName = '';
        this.timeOfPop = '';
      }
    }
  },
  methods: {
    saveRaid() {
      this.$validator.validateAll().then(async res => {
        if (res) {
          var id = await findGymIdByName(this.selectedGymName);
          var timeOfPopDate = timeToDate(this.timeOfPop);
          var startTimeDate = timeOfPopDate;
          if (this.startTime) {
            startTimeDate = timeToDate(this.startTime);
          }
          if(this.raid) {
            await putRaid({id: this.raid.id, gymId: id, hatchTime: timeOfPopDate.toISOString(), raidStartTime: startTimeDate.toISOString()});
            this.$toasted.show('Raid modifié avec succès', {duration : 2000, className: 'toast-success', fullWidth: true, position: 'top-center', fitToScreen: false});
          } else {
            await postRaid({gymId: id, hatchTime: timeOfPopDate.toISOString(), raidStartTime: startTimeDate.toISOString()});
            this.$toasted.show('Raid ajouté avec succès', {duration : 2000, className: 'toast-success', fullWidth: true, position: 'top-center', fitToScreen: false});
          }
          this.$emit('raidModified');
          this.$modal.hide('raid');
        }
      });
    }
  },
  async created() {
    this.gyms = await getGyms();
  }
}
</script>

<style>

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
