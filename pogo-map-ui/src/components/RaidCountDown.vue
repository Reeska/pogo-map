<template>
  <countdown :time="remaining.time" class="countdown" :class="remaining.type" @countdownend="calcRemaining()">
    <template slot-scope="props">{{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}</template>
  </countdown>
</template>

<script>
  export default {
    props: ['raid'],
    data() {
      return {
        remaining: {}
      }
    },
    methods: {

    },
    created() {
      this.hacthTimeasDate = new Date(this.raid.hatchTime);
      this.calcRemaining();
    },
    methods: {
      calcRemaining() {
        const now = new Date();

        if(now.getTime() < this.hacthTimeasDate.getTime()) {
          // hatch time dans le futur -> rose
          this.remaining = {type: 'unhatched', time: this.hacthTimeasDate.getTime() - now.getTime()};
        } else {
          // hatch time dans le passé -> orange
          this.remaining = {type: 'ongoing', time: (this.hacthTimeasDate.getTime() + (45 * 60 * 1000)) - now.getTime()};
        }
      },
      remainingType() {
        const now = new Date();

        if(now.getTime() < this.hacthTimeasDate.getTime()) {
          // hatch time dans le futur -> rose
          return 'unhatched';
        } else {
          // hatch time dans le passé -> orange
          return 'ongoing';
        }
      }
    }
  }
</script>

<style lang="scss">
  $pink: #E17EAD;
  $light-white: #FCFEFA;
  $orange: #FC7B39;

  .countdown {
    border: 2px solid $light-white;
    border-radius: 12px;
    color: $light-white;
    font-weight: bold;
    padding: 6px;
    display: block;

    &.ongoing {
      background-color: $orange;
    }
    &.unhatched {
      background-color: $pink;
    }
  }
</style>
