<template>
  <modal name="raid" height="auto" :adaptive="true" @before-close="beforeClose()">
    <v-container fluid>
      <div class="sp-close" @click="$modal.hide('raid')">×</div>

      <h2>{{ raid ? 'Modifier' : 'Ajouter'}} un raid 5 &#9733;</h2>

      <v-form
        v-model="valid"
        ref="manageRaidForm"
        @submit.prevent="saveRaid()"
        :lazy-validation="true">

        <v-select
          :items="gyms"
          :disabled="!!raid"
          item-text="name"
          v-model="selectedGym"
          label="Nom de l'arène"
          autocomplete
          :max-height="200"
          :rules="[validationRules.required]"
          required
        />

        <v-text-field
          label="Heure du pop"
          v-model="timeOfPop"
          :rules="[validationRules.required, validationRules.timeFormat]"
          placeholder="Au format HH:MM ex : 14:45"
          :validate-on-blur="true"
          mask="##:##"
          :return-masked-value="true"
          required
        />

        <v-text-field
          label="On lance à"
          v-model="startTime"
          :rules="[validationRules.timeFormat]"
          placeholder="Au format HH:MM ex : 14:45"
          :validate-on-blur="true"
          mask="##:##"
          :return-masked-value="true"
        />

        <v-btn @click="saveRaid()">Enregistrer</v-btn>
      </v-form>

      <v-alert type="error" :value="error">{{error}}</v-alert>
    </v-container>
  </modal>
</template>

<script>
  import {timeToDate, toPrintedDate} from '../services/date-service'
  import {getGyms, postRaid, putRaid} from '../services/gyms-services'
  export default {
    props: ['raid'],
    data() {
      return {
        selectedGym: null,
        timeOfPop: '',
        startTime: '',
        gyms: [],
        error: '',
        toast: {
          visible: false,
          text: ''
        },
        valid: false,
        validationRules: {
          timeFormat: time => !time || /^[0-9]{2}:[0-9]{2}$/.test(time) || `Format incorrect : HH:MM attendu`,
          required: value => !!value || 'Champ obligatoire',
        }
      }
    },
    async created() {
      this.gyms = await getGyms();
    },
    watch: {
      raid() {
        if (this.raid) {
          this.gyms
            .filter(gym => this.raid.gym.id === gym.id)
            .forEach(gym => {
              this.selectedGym = gym
            });
          this.timeOfPop = toPrintedDate(this.raid.hatchTime);
          if (this.raid.raidStartTime) {
            this.startTime = toPrintedDate(this.raid.raidStartTime);
          }
        }
      }
    },
    methods: {
      async saveRaid() {
        if (!this.$refs.manageRaidForm.validate()) {
          return;
        }
        const timeOfPopDate = timeToDate(this.timeOfPop);
        const startTimeDate = this.startTime ? timeToDate(this.startTime) : null;
        let res;
        if (this.raid) {
          res = await putRaid({
            id: this.raid.id, gymId: this.selectedGym.id, hatchTime: timeOfPopDate.toISOString(),
            raidStartTime: startTimeDate ? startTimeDate.toISOString() : ''
          })
            .catch(e => e);
        } else {
          res = await postRaid({
            gymId: this.selectedGym.id, hatchTime: timeOfPopDate.toISOString(), raidStartTime: startTimeDate ?
              startTimeDate.toISOString() : ''
          })
            .catch(e => e);
        }
        this.error = res.message;
        if (!this.error) {
          this.resetFields();
          this.$emit('raidModified', {
            message: 'Raid enregistré avec succès'
          });
          this.$modal.hide('raid');
        }
      },
      beforeClose() {
        this.$emit('closeModal');
      },
      resetFields() {
        this.$refs.manageRaidForm.reset();
      }
    }
  }
</script>

<style lang="scss" scoped>
  form {
    text-align: center;
  }
  .v--modal-overlay {
    z-index: 9999 !important;
  }
  .toasted-container.top-center {
    top: 0;
  }
  .toasted.toast-success {
    color: #2ecc71 !important;
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
    margin: 0 auto;
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
