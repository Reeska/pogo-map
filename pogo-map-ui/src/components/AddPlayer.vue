<template>
  <modal name="player" height="auto" :adaptive="true" @before-close="beforeClose()">
    <v-container fluid>
      <div class="sp-close" @click="$modal.hide('player')">×</div>

      <h2>Ajouter un participant à un raid</h2>

      <div style="margin: auto; margin-top: 10px; text-align: center; width: 70%">
        <strong>{{selectedGymName}}</strong><br/>
        <strong>On lance à :</strong> {{startTime ? startTime : '-'}}<br/>
        <strong>{{numberOfPlayers}} participants :</strong> {{playerNames}}
      </div>

      <v-form
        v-model="valid"
        ref="managePlayersForm"
        @submit.prevent="saveRaid()"
        :lazy-validation="true">

        <v-text-field
          label="Mon pseudo"
          v-model="pseudo"
          :rules="[validationRules.required]"
          :validate-on-blur="true"
          required
        />

        <v-text-field
          label="Nombre de comptes"
          v-model.number="numberOfAccounts"
          :validate-on-blur="true"
          :rules="[validationRules.required]"
          required
        />

        <v-btn @click="saveRaid()">Enregistrer</v-btn>
      </v-form>

      <v-alert type="error" :value="error">{{error}}</v-alert>
    </v-container>
  </modal>
</template>

<script>

  import {timeToDate, toPrintedDate} from '../services/date-service'
  import {postPlayer} from '../services/gyms-services'

  export default {
    props: ['raid'],

    data() {
      return {
        selectedGymName: '',
        numberOfAccounts: 1,
        startTime: '',
        players: [],
        playerNames: '',
        numberOfPlayers: 0,
        pseudo: '',
        error: '',
        toast: {
          visible: false,
          text: ''
        },
        valid: false,
        validationRules: {
          required: value => !!value || 'Champ obligatoire'
        }
      }
    },

    watch: {
      raid() {
        this.pseudo = localStorage.getItem('nickname');

        if(this.raid) {
          this.selectedGymName = this.raid.gym.name;
          this.players = this.raid.players;
          if(this.players) {
            this.numberOfPlayers = this.players.map(p => p.accounts).reduce((a,b) => a+b, 0);
            this.playerNames = this.players.map(p => p.nickname + ((p.accounts > 1) ? (' (' + p.accounts + ')') : '')).join(', ');
          }
          if(this.raid.raidStartTime) {
            this.startTime = toPrintedDate(this.raid.raidStartTime);
          }
        }
        this.numberOfAccounts = 1;
      }
    },

    methods: {
      async saveRaid() {
        if (!this.$refs.managePlayersForm.validate()) {
          return;
        }
        const res = await postPlayer(this.raid.id, {nickname: this.pseudo, accounts: this.numberOfAccounts})
          .catch(e => e);

        this.error = res.message;

        if (!this.error) {
          localStorage.setItem('nickname', this.pseudo);

          this.$emit('playerAdded', {
            message: 'Participants enregistrés avec succès'
          });

          this.resetFields();
          this.$modal.hide('player');
        }
      },

      beforeClose() {
        this.$emit('closeModal');
      },

      resetFields() {
        this.$refs.managePlayersForm.reset();
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
